<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\EditManagementNoticeUseCase;

use App\Infrastructure\Repository\ManagementNoticeEloquentRepository;
use App\Models\ManagementNotice\ManagementNotice;

class EditManagementNoticeUseCase
{
    public function __construct(
        private readonly ManagementNoticeEloquentRepository $managementNoticeRepository
    ) {
    }

    public function execute(int $noticeId, EditManagementNoticeInput $input): ManagementNotice
    {
        $notice = $this->managementNoticeRepository->findById($noticeId);

        $notice->edit(
            $input->title,
            $input->content,
            $input->isPublished,
            $input->publishedAt,
            $input->unpublishedAt,
            $input->contractAppType
        );

        return $this->managementNoticeRepository->save($notice);
    }
}
