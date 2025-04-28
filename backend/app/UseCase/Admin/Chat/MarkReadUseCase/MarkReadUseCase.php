<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\MarkReadUseCase;

use App\Infrastructure\Repository\ChatroomEloquentRepository;
use App\Infrastructure\Repository\Firestore\ChatroomSummaryRepository;
use App\Models\Admin\Admin;
use DomainException;

class MarkReadUseCase
{
    public function __construct(
        private readonly ChatroomEloquentRepository $chatroomRepository,
        private readonly ChatroomSummaryRepository $summaryRepository,
    ) {
    }

    public function execute(Admin $admin, int $chatroomId): void
    {
        $chatroom = $this->chatroomRepository->findById($chatroomId, withMembers: true);
        if ($chatroom === null) {
            throw new DomainException('チャットルームが見つかりませんでした');
        }
        $adminAsChatMember = $chatroom->getMemberFrom($admin);

        $chatroom->markAsRead($adminAsChatMember);
        $this->chatroomRepository->save($chatroom);

        $this->summaryRepository->save($chatroom->summary());
    }
}
