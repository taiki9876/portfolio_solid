<?php

declare(strict_types=1);

namespace App\Models\Chatroom;

use App\Models\Admin\Admin;
use App\Models\Chatroom\ValueObjects\ChatroomSummary;
use App\Models\Chatroom\ValueObjects\ChatroomTypeEnum;
use App\Models\Chatroom\ValueObjects\MemberTypeEnum;
use App\Models\Contract\Contract;
use App\Models\Customer\Customer;
use App\Models\Shared\EloquentModel;
use Carbon\CarbonImmutable;
use Database\Factories\Chatroom\ChatroomFactory;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;

/**
 * チャットルーム情報
 *
 * @property int                  $id
 * @property string               $contract_key
 * @property bool                 $is_processed
 * @property bool                 $is_spam
 * @property ChatroomTypeEnum     $chat_type
 * @property string|null          $last_message            最終メッセージ
 * @property CarbonImmutable|null $last_message_updated_at 最終メッセージ更新日時
 * @property CarbonImmutable      $created_at              作成日時
 * @property CarbonImmutable      $updated_at              更新日時
 * @property CarbonImmutable|null $deleted_at              削除日時 (NULL 可能)
 *
 * //relations
 * @property-read Collection<int, ChatroomMember> $members チャットルームメンバー
 */
class Chatroom extends EloquentModel
{
    /** @use HasFactory<ChatroomFactory> */
    use HasFactory;
    use SoftDeletes;

    public const CUSTOMER_MAX_COUNT = 1;

    protected $table = 'chatrooms'; // テーブル名
    protected $primaryKey = 'id';

    protected $fillable = [
        'is_processed',
        'is_spam',
        'last_message',
        'last_message_updated_at',
        'deleted_at',
    ];

    protected $casts = [
        'is_processed' => 'boolean',
        'is_spam' => 'boolean',
        'chat_type' => ChatroomTypeEnum::class,
        'last_message' => 'string',
        'last_message_updated_at' => 'immutable_datetime',
        'created_at' => 'immutable_datetime',
        'updated_at' => 'immutable_datetime',
        'deleted_at' => 'immutable_datetime',
    ];

    /**
     * @param  Contract              $contract
     * @param  ChatroomTypeEnum      $chatType
     * @param  array<ChatroomMember> $members
     * @return self
     * @throws Exception
     */
    public static function create(
        Contract $contract,
        ChatroomTypeEnum $chatType,
        array $members = [],
    ): self {
        $chatroom = new self();
        $chatroom->contract_key = $contract->key;
        $chatroom->is_processed = false;
        $chatroom->is_spam = false;
        $chatroom->chat_type = $chatType;
        $chatroom->last_message = null;
        $chatroom->last_message_updated_at = null;
        $chatroom->created_at = CarbonImmutable::now();
        $chatroom->updated_at = CarbonImmutable::now();
        $chatroom->deleted_at = null;

        $memberTypes = collect($members)->map(static fn (ChatroomMember $member) => $member->memberType());
        $customerCount = $memberTypes->filter(static fn (MemberTypeEnum $type) => $type->is(MemberTypeEnum::CUSTOMER))->count();
        if ($customerCount === 0) {
            throw new \DomainException('会員は必ず1人以上必要です');
        }
        if ($customerCount > self::CUSTOMER_MAX_COUNT) {
            throw new \DomainException('会員は' . self::CUSTOMER_MAX_COUNT . '人までです');
        }
        $chatroom->members->push(...$members);

        return $chatroom;
    }

    /**
     * チャットルーム　参加者
     * @return HasMany<ChatroomMember, $this>
     */
    public function members(): HasMany
    {
        return $this->hasMany(ChatroomMember::class, 'chatroom_id', 'id');
    }

    /**
     * @param  Admin|Customer $account
     * @return ChatroomMember
     */
    public function getMemberFrom(Admin | Customer $account): ChatroomMember
    {
        $account = $this->members->first(static fn (ChatroomMember $member) => $member->memberId() === $account->id);
        if ($account === null) {
            throw new \DomainException("チャットルームに参加していません。");
        }
        return $account;
    }

    /**
     * チャットルームの現在の状態を取得
     * @return ChatroomSummary
     */
    public function summary(): ChatroomSummary
    {
        return new ChatroomSummary($this);
    }

    /**
     * チャットルーム メンバー追加
     * @param  ChatroomMember $member
     * @return void
     */
    public function addMember(ChatroomMember $member): void
    {
        if ($member->memberType()->is(MemberTypeEnum::CUSTOMER)) {
            throw new \DomainException('会員は既に存在しています');//初期作成時に会員は入っている前提※チャットルーム
        }
        $this->members->push($member);
    }

    /**
     * 新しいメッセージ 未読件数も更新
     * @param  MemberTypeEnum $messageSenderType
     * @param  string         $newMessage
     * @param  string[]       $alreadyReadBy
     * @return void
     */
    public function newMessage(
        MemberTypeEnum $messageSenderType,
        string $newMessage,
        array $alreadyReadBy = [],
    ): void {
        $isCustomer = $messageSenderType->is(MemberTypeEnum::CUSTOMER);
        if ($isCustomer && $this->is_spam === true) {
            throw new \DomainException('スパム会員はメッセージ送信を受け付けません。');
        }

        $this->is_processed = false;

        $this->last_message = $newMessage;
        $this->last_message_updated_at = CarbonImmutable::now();

        //管理者からの送信 -> 会員のみ未読数を増やす || 逆に会員からの送信 -> 管理者"全員"の未読数を増やす
        $receiveTargetType = $isCustomer ? MemberTypeEnum::STAFF : MemberTypeEnum::CUSTOMER;
        $this->members
            ->each(static function (ChatroomMember $member) use ($receiveTargetType, $alreadyReadBy) {
                if ($member->memberType()->is($receiveTargetType) && !$member->isReadByMe($alreadyReadBy)) {
                    $member->incrementUnreadCount();
                }
            });
    }

    /**
     * @param  Message|null $message
     * @return void
     */
    public function setLastMessage(?Message $message): void
    {
        if ($message === null) {
            $this->last_message = null;
            $this->last_message_updated_at = null;
            return;
        }

        $this->last_message = $message->toString();
        $this->last_message_updated_at = $message->sendAt;
    }

    /**
     * 未読件数リセット(=既読をつける)
     * @param  ChatroomMember $reader
     * @return void
     */
    public function markAsRead(ChatroomMember $reader): void
    {
        $this->members
            ->each(static function (ChatroomMember $member) use ($reader) {
                if ($member->id === $reader->id) {
                    $member->markAsRead();
                }
            });
    }

    /**
     * 未読件数を減らす
     * //TODO: $targetTypeが管理者の場合、減らす処理から除外するメンバーの指定が必要なので考慮漏れ注意。会員側のチャット実装時に対応
     * //TODO補足: 例えば会員が送信したメッセージ。そのメッセージが管理者側によって未読の場合と既読の場合あり。既読の場合は未読数を減らす必要がない
     * @param  MemberTypeEnum $targetType
     * @return void
     */
    public function decrementUnreadCount(MemberTypeEnum $targetType): void
    {
        $this->members
            ->each(static function (ChatroomMember $member) use ($targetType) {
                if ($member->memberType()->is($targetType)) {
                    $member->decrementUnreadCount();
                }
            });
    }

    /**
     * スパムフラグをつける
     * @param  MemberTypeEnum $operator
     * @param  bool           $isOn
     * @return void
     */
    public function markSpam(MemberTypeEnum $operator, bool $isOn): void
    {
        if ($operator->is(MemberTypeEnum::CUSTOMER)) {
            throw new \DomainException('会員はスパムフラグを立てることはできません');
        }
        $this->is_spam = $isOn;
        // $this->is_processed = false;//NOTE: 対応済みフラグは変更しない
    }

    /**
     * 対応済みフラグの変更
     * @param  MemberTypeEnum $operator
     * @param  bool           $isOn
     * @return void
     */
    public function markProcessed(MemberTypeEnum $operator, bool $isOn): void
    {
        if ($operator->is(MemberTypeEnum::CUSTOMER)) {
            throw new \DomainException('会員は対応済みフラグの変更は不可です。');
        }
        if ($this->is_spam === true) {
            throw new \DomainException('スパムフラグが立っているチャットルームは、対応済みの変更はできません。');
        }
        $this->is_processed = $isOn;
    }
}
