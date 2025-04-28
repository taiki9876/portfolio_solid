<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Home\FetchAggregationSummaryUseCase;

use App\Models\ManagementNotice\ManagementNotice;
use App\Util\DateUtil;
use Illuminate\Support\Collection;

readonly class FetchAggregationSummaryOutput
{
    /**
     * @param Collection<int, ManagementNotice> $notices
     */
    public function __construct(
        private Collection $notices,
    ) {
    }

    /**
     * 運営からのお知らせ
     * @return array<int, array{id: int, title: string, content: string, publishedAt: string}>
     */
    public function managementNotices(): array
    {
        return $this->notices->map(static function (ManagementNotice $notice) {
            return [
                'id' => $notice->id,
                'title' => $notice->title,
                'content' => $notice->content,
                'publishedAt' => $notice->published_at->format(DateUtil::DATE_FORMAT),
            ];
        })->toArray();
    }
}
