<?php

declare(strict_types=1);

namespace App\Models\Chatroom;

use App\Models\Chatroom\ValueObjects\ContentTypeEnum;
use App\Models\Chatroom\ValueObjects\MemberTypeEnum;
use Carbon\CarbonImmutable;
use Google\Cloud\Core\Timestamp;
use Google\Cloud\Firestore\DocumentSnapshot;

/**
 * Firestore.message
 */
class Message
{
    /**
     * @param string|null          $id
     * @param int                  $chatroomId
     * @param string               $content
     * @param ContentTypeEnum      $contentType
     * @param CarbonImmutable|null $readAt
     * @param string[]             $readBy
     * @param CarbonImmutable      $sendAt
     * @param MemberTypeEnum       $senderType
     * @param string               $senderUID
     * @param CarbonImmutable      $createdAt
     * @param CarbonImmutable      $updatedAt
     */
    public function __construct(
        public readonly string|null $id,
        public readonly int $chatroomId,
        public readonly string $content,
        public readonly ContentTypeEnum $contentType,
        public readonly CarbonImmutable|null $readAt,
        public readonly array $readBy,
        public readonly CarbonImmutable $sendAt,
        public readonly MemberTypeEnum $senderType,
        public readonly string $senderUID,
        public readonly CarbonImmutable $createdAt,
        public readonly CarbonImmutable $updatedAt,
    ) {
    }

    public static function fromDocSnapshot(DocumentSnapshot $documentSnapshot): self
    {
        $id = $documentSnapshot->id();
        $data = $documentSnapshot->data() ?? [];

        return new self(
            $id,
            (int) $data['chatroomId'],
            $data['content'] ?? "",
            ContentTypeEnum::from($data['contentType']),
            self::toCarbon($data['readAt'] ?? null, false),
            $data['readBy'] ?? [],
            self::toCarbon($data['sendAt'] ?? null) ?? CarbonImmutable::now(),
            MemberTypeEnum::from($data['senderType']),
            $data['senderUID'] ?? "",
            self::toCarbon($data['createdAt'] ?? null) ?? CarbonImmutable::now(),
            self::toCarbon($data['updatedAt'] ?? null) ?? CarbonImmutable::now(),
        );
    }

    /**
     * メッセージ文字列を取得
     * NOTE: メッセージのタイプごとに分岐あり
     * @return string
     */
    public function toString(): string
    {
        if ($this->contentType->is(ContentTypeEnum::PHOTO)) {
            return "画像を送信しました";
        }

        if ($this->contentType->is(ContentTypeEnum::VIDEO)) {
            return "動画を送信しました";
        }

        if ($this->contentType->is(ContentTypeEnum::PROCESSED)) {
            return "対応済み";//NOTE: このタイプは厳密にはメッセージではないが、念の為定義しておく
        }

        return $this->content;
    }

    /**
     * @param  Timestamp|null       $timestamp
     * @param  bool                 $isRequired
     * @return CarbonImmutable|null
     */
    private static function toCarbon(?Timestamp $timestamp, bool $isRequired = true): ?CarbonImmutable
    {
        if ($timestamp instanceof Timestamp) {
            $datetimeImmutable = $timestamp->get();
            return CarbonImmutable::instance($datetimeImmutable)->setTimezone(config("app.timezone"));
        }

        if ($isRequired === true) {
            throw new \DomainException("不正データ：必須の日時データにnullデータがあります。");
        }
        return null;
    }
}
