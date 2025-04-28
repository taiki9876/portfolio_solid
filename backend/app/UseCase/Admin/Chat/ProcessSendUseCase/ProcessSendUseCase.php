<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\ProcessSendUseCase;

use App\Infrastructure\Repository\ChatroomEloquentRepository;
use App\Infrastructure\Repository\Firestore\ChatroomSummaryRepository;
use App\Infrastructure\Repository\Firestore\MessageRepository;
use App\Models\Admin\Admin;

class ProcessSendUseCase
{
    public function __construct(
        private readonly ChatroomEloquentRepository $chatroomRepository,
        private readonly ChatroomSummaryRepository $summaryRepository,
        private readonly MessageRepository $messageRepository,
    ) {
    }

    /**
     * メッセージが送信された時のサーバー側追加処理
     *
     * ・対応済みフラグを未対応にする
     * ・未読メッセージ数の増加
     * ・最終メッセージの更新
     * ・会員へのpush通知 (未実装)
     * @param  Admin $admin
     * @param  int   $chatroomId
     * @return void
     */
    public function execute(Admin $admin, int $chatroomId): void
    {
        $chatroom = $this->chatroomRepository->findById($chatroomId, withMembers: true);
        if ($chatroom === null) {
            throw new \DomainException("チャットルームが見つかりませんでした。");
        }

        $latestMessage = $this->messageRepository->findLatestMessageByChatroom($chatroom);
        if ($latestMessage === null) {
            return;
        }

        $adminAsMember = $chatroom->getMemberFrom($admin);
        $chatroom->newMessage($adminAsMember->memberType(), $latestMessage->toString(), $latestMessage->readBy);
        $this->chatroomRepository->save($chatroom);

        $this->summaryRepository->save($chatroom->summary());
    }
}
