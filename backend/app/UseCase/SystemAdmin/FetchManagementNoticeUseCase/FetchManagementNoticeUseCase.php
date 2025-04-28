<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\FetchManagementNoticeUseCase;

use App\Infrastructure\Repository\ManagementNoticeEloquentRepository;

class FetchManagementNoticeUseCase
{
    public function __construct(
        private readonly ManagementNoticeEloquentRepository $managementNoticeRepository
    ) {
    }

    public function execute(int $noticeId): FetchManagementNoticeOutput
    {
        $notice = $this->managementNoticeRepository->findById($noticeId);
        return new FetchManagementNoticeOutput($notice);
    }
}
