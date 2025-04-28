<?php

declare(strict_types=1);

namespace App\Models\Chatroom;

use App\Models\Admin\Admin;
use App\Models\Admin\ValueObjects\AdminRoleEnum;
use App\Models\Chatroom\ValueObjects\MemberTypeEnum;
use App\Models\Customer\Customer;
use Carbon\CarbonImmutable;
use Database\Factories\Chatroom\ChatroomMemberFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use InvalidArgumentException;
use UnexpectedValueException;

/**
 * チャットルームに参加するメンバー情報
 *
 * @property int                  $id
 * @property int                  $chatroom_id
 * @property int|null             $admin_id
 * @property int|null             $customer_id
 * @property int                  $unread_count 未読メッセージ数
 * @property CarbonImmutable      $created_at   作成日時
 * @property CarbonImmutable      $updated_at   更新日時
 * @property CarbonImmutable|null $deleted_at   削除日時
 */
class ChatroomMember extends Model
{
    /** @use HasFactory<ChatroomMemberFactory> */
    use HasFactory;
    use SoftDeletes;

    public const PRIMARY_KEY = 'id';

    protected $table = 'chatroom_members';
    protected $primaryKey = self::PRIMARY_KEY;

    protected $fillable = [
        'unread_count',
        'deletedAt',
    ];

    protected $casts = [
        'unread_count' => 'integer',
        'createdAt' => 'immutable_datetime',
        'updatedAt' => 'immutable_datetime',
        'deletedAt' => 'immutable_datetime',
    ];

    /**
     * @param  Admin|Customer $newMember
     * @return self
     */
    public static function create(
        Admin|Customer $newMember,
    ): self {
        $isAdmin = $newMember instanceof Admin;
        if ($isAdmin) {
            if ($newMember->roleIs(AdminRoleEnum::SYSTEM_ADMIN) || $newMember->roleIs(AdminRoleEnum::SUPPORT_ADMIN)) {
                throw new InvalidArgumentException('システム管理者およびサポートはお問い合わせチャットには参加できません。');
            }
        }

        $member = new ChatroomMember();
        $member->admin_id = $isAdmin ? $newMember->id : null;
        $member->customer_id = $isAdmin ? null : $newMember->id;
        $member->unread_count = 0;
        $member->created_at = CarbonImmutable::now();
        $member->updated_at = CarbonImmutable::now();
        $member->deleted_at = null;

        return $member;
    }

    /**
     * メンバーの種別を取得する（管理者 or 会員）
     * @return MemberTypeEnum
     */
    public function memberType(): MemberTypeEnum
    {
        return $this->admin_id !== null ? MemberTypeEnum::STAFF : MemberTypeEnum::CUSTOMER;
    }

    /**
     * @return int
     */
    public function memberId(): int
    {
        $result = $this->admin_id ?? $this->customer_id;
        if ($result === null) {
            throw new UnexpectedValueException('メンバー情報が不正です。');
        }

        return $result;
    }

    /**
     * firestoreでの識別子として利用する (例： staff_123、customer_456)
     * 変更時の注意: admin/transform.ts typePrefixId() とルールを合わせること
     * @return string
     */
    public function typePrefixId(): string
    {
        return $this->memberType()->value . "_" . $this->memberId();
    }

    /**
     * @param  string[] $readBy
     * @return bool
     */
    public function isReadByMe(array $readBy): bool
    {
        return in_array($this->typePrefixId(), $readBy, true);
    }

    public function incrementUnreadCount(): void
    {
        $this->unread_count++;
    }

    public function decrementUnreadCount(): void
    {
        $this->unread_count = max(0, $this->unread_count - 1);
    }

    public function markAsRead(): void
    {
        $this->unread_count = 0;
    }
}
