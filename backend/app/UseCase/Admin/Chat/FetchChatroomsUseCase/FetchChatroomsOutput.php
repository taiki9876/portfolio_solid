<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\FetchChatroomsUseCase;

use App\Models\Chatroom\ValueObjects\ChatroomTypeEnum;
use App\Util\DateUtil;
use Carbon\CarbonImmutable;

/**
 * Chatroomのコレクションクラス
 */
class FetchChatroomsOutput
{
    /**
     * NOTE: 詳細な型はaddメソッドを参照
     * @var array<mixed>
     */
    public array $value;
    public bool $hasMore;

    public function __construct()
    {
        $this->value = [];
        $this->hasMore = false;
    }

    public function add(
        int $chatroomId,
        string $contractKey,
        int $chatType,
        string $customerName,
        string|null $customerAvatarImageUrl,
        bool $isProcessed,
        bool $isSpam,
        string|null $lastMessage,
        CarbonImmutable|null $lastMessageUpdatedAt,
        int $unreadMessageCount,
    ): void {
        $this->value[] = [
            'chatroomId' => $chatroomId,
            'contractKey' => $contractKey,
            'chatType' => ChatroomTypeEnum::from($chatType)->description(),
            'customerName' => $customerName,
            'customerAvatarImageUrl' => $customerAvatarImageUrl,
            'isProcessed' => $isProcessed,
            'isSpam' => $isSpam,
            'lastMessage' => $lastMessage,
            'lastMessageUpdatedAt' => $lastMessageUpdatedAt?->format(DateUtil::DATE_FORMAT),
            'unreadMessageCount' => $unreadMessageCount,
        ];
    }
}
