<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\DeleteManagementNoticeUseCase;

use App\Infrastructure\Repository\ManagementNoticeEloquentRepository;

class DeleteManagementNoticeUseCase
{
    public function __construct(
        private readonly ManagementNoticeEloquentRepository $repository,
    ) {
    }

    public function execute(int $noticeId): bool
    {
        return $this->repository->removeBy($noticeId);
    }
}
