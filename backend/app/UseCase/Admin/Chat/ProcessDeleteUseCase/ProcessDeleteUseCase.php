<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\ProcessDeleteUseCase;

use App\Infrastructure\Repository\ChatroomEloquentRepository;
use App\Infrastructure\Repository\Firestore\ChatroomSummaryRepository;
use App\Infrastructure\Repository\Firestore\MessageRepository;
use App\Models\Chatroom\ValueObjects\MemberTypeEnum;

class ProcessDeleteUseCase
{
    public function __construct(
        private readonly ChatroomEloquentRepository $chatroomRepository,
        private readonly ChatroomSummaryRepository $summaryRepository,
        private readonly MessageRepository $messageRepository,
    ) {
    }

    public function execute(int $chatroomId, ProcessDeleteInput $input): bool
    {
        $chatroom = $this->chatroomRepository->findById($chatroomId, withMembers: true);
        if ($chatroom === null) {
            throw new \DomainException("チャットルームが見つかりませんでした。");
        }

        if ($input->isLatestMessageDeleted) {//NOTE: 最新メッセージが削除->最終メッセージ情報も更新しなければならない
            $latestMessage = $this->messageRepository->findLatestMessageByChatroom($chatroom);
            $chatroom->setLastMessage($latestMessage);
        }

        if ($input->isUnreadMessage) {
            $chatroom->decrementUnreadCount(MemberTypeEnum::CUSTOMER);
        }

        $isChanged = $input->isLatestMessageDeleted || $input->isUnreadMessage;
        if ($isChanged) {
            $this->chatroomRepository->save($chatroom);
            $this->summaryRepository->save($chatroom->summary());
        }

        return $isChanged;
    }
}
