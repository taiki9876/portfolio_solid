<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\FetchManagementNoticeUseCase;

use App\Models\ManagementNotice\ManagementNotice;
use App\Util\DateUtil;

readonly class FetchManagementNoticeOutput
{
    public function __construct(
        public ManagementNotice $notice,
    ) {
    }

    /**
     * @return array{
     *     id: int,
     *     title: string,
     *     content: string,
     *     publishedAt: non-falsy-string,
     *     unpublishedAt: non-falsy-string|null,
     *     isPublished: bool,
     *     currentPublishState: string,
     *     contractAppType: int|null,
     *     createdAt: non-falsy-string,
     * }
     */
    public function toArray(): array
    {
        $notice = $this->notice;

        return [
            "id" => $notice->id,
            "title" => $notice->title,
            "content" => $notice->content,
            "publishedAt" => $notice->published_at->format(DateUtil::DATE_FORMAT),
            "unpublishedAt" => DateUtil::nullableCarbon($notice->unpublished_at)?->format(DateUtil::DATE_FORMAT),
            "isPublished" => $notice->is_published,
            "currentPublishState" => $notice->publishingStatus()->value,
            "contractAppType" => $notice->contract_app_type?->value,
            "createdAt" => $notice->created_at->format(DateUtil::DATE_FORMAT),
        ];
    }
}
