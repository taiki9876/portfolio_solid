<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\ChangeChatroomStatus;

use App\Infrastructure\Repository\ChatroomEloquentRepository;
use App\Infrastructure\Repository\Firestore\ChatroomSummaryRepository;
use App\Models\Admin\Admin;
use DomainException;

class ChangeChatroomStatusUseCase
{
    public function __construct(
        private readonly ChatroomEloquentRepository $chatroomRepository,
        private readonly ChatroomSummaryRepository $summaryRepository,
    ) {
    }

    public function execute(Admin $admin, int $chatroomId, ChangeChatroomStatusInput $input): bool
    {
        $chatroom = $this->chatroomRepository->findById($chatroomId, withMembers: true);
        if ($chatroom === null) {
            throw new DomainException("チャットルームが見つかりませんでした。");
        }
        $adminAsChatMember = $chatroom->getMemberFrom($admin);

        if ($input->requestStatusType->is(RequestStatusEnum::PROCESSED)) {
            $chatroom->markProcessed($adminAsChatMember->memberType(), $input->isOn);
        } elseif ($input->requestStatusType->is(RequestStatusEnum::SPAM)) {
            $chatroom->markSpam($adminAsChatMember->memberType(), $input->isOn);
        }

        $this->chatroomRepository->save($chatroom);
        $this->summaryRepository->save($chatroom->summary());

        return true;
    }
}
