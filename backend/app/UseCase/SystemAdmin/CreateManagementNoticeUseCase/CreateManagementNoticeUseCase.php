<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\CreateManagementNoticeUseCase;

use App\Infrastructure\Repository\ManagementNoticeEloquentRepository;
use App\Models\ManagementNotice\ManagementNotice;

class CreateManagementNoticeUseCase
{
    public function __construct(
        private readonly ManagementNoticeEloquentRepository $managementNoticeRepository,
    ) {
    }

    public function execute(CreateManagementNoticeInput $input): ManagementNotice
    {
        $managementNotice = ManagementNotice::create(
            $input->title,
            $input->content,
            $input->isPublished,
            $input->publishedAt,
            $input->unpublishedAt,
            $input->contractAppType,
        );
        return $this->managementNoticeRepository->save($managementNotice);
    }
}
