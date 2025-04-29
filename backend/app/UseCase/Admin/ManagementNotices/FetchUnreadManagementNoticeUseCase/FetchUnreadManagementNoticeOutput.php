<?php

declare(strict_types=1);

namespace App\UseCase\Admin\ManagementNotices\FetchUnreadManagementNoticeUseCase;

use App\Models\ManagementNotice\ManagementNotice;
use App\Util\DateUtil;

readonly class FetchUnreadManagementNoticeOutput
{
    public function __construct(
        private ManagementNotice|null $notice,
    ) {
    }

    public function hasUnread(): bool
    {
        return $this->notice !== null;
    }

    /**
     * @return array{
     *     id: int,
     *     title: string,
     *     content: string,
     *     publishedAt: string|null,
     * }|null
     */
    public function toArray(): ?array
    {
        if ($this->notice === null) {
            return null;
        }

        return [
            "id" => $this->notice->id,
            "title" => $this->notice->title,
            "content" => $this->notice->content,
            "publishedAt" => DateUtil::nullableCarbon($this->notice->published_at)?->format(DateUtil::DATE_FORMAT),
        ];
    }
}
