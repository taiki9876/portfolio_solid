<?php

declare(strict_types=1);

namespace App\Models\Chatroom\ValueObjects;

use App\Models\Chatroom\Chatroom;
use App\Models\Chatroom\ChatroomMember;
use Carbon\CarbonImmutable;

/**
 * 最新メッセージなどを管理 Firestoreに保存するドキュメントデータになる
 * @property string             $contractKey
 * @property int                $chatroomId
 * @property string             $lastMessage
 * @property array<string, int> $unreadCount
 */
readonly class ChatroomSummary
{
    public string $contractKey;
    public int $chatroomId;
    public string $lastMessage;
    public CarbonImmutable|null $lastMessageUpdatedAt;
    /**
     * @var array<string, int>
     */
    public array $unreadCount;
    public bool $isProcessed;
    public bool $isSpam;

    /**
     * @param Chatroom $chatroom
     */
    public function __construct(
        Chatroom $chatroom,
    ) {
        $this->contractKey = $chatroom->contract_key;
        $this->chatroomId = $chatroom->id;
        $this->lastMessage = $chatroom->last_message ?? "";
        $this->lastMessageUpdatedAt = $chatroom->last_message_updated_at;
        $this->isProcessed = $chatroom->is_processed;
        $this->isSpam = $chatroom->is_spam;

        /**
         * @var array<string, int> $unreadCount
         */
        $unreadCount = $chatroom->members->mapWithKeys(function (ChatroomMember $member) {
            $typePrefixId = $this->createSummaryId($member);
            return [$typePrefixId => $member->unread_count];
        })->toArray();
        $this->unreadCount = $unreadCount;
    }

    /**
     * サマリーデータに付随するIDを付与
     * NOTE: subscribeSummary.tsのsummaryId命名は合わせること
     * @param  ChatroomMember $member
     * @return string
     */
    private function createSummaryId(ChatroomMember $member): string
    {
        return $member->memberType()->value . "_" . $member->memberId();
    }
}
