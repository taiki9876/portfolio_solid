<?php

declare(strict_types=1);

namespace App\UseCase\Admin\ManagementNotices\FetchManagementNoticesUseCase;

use App\Models\ManagementNotice\ManagementNotice;
use App\Models\Shared\Pagination\PaginationMeta;
use App\Util\DateUtil;
use Illuminate\Support\Collection;

readonly class FetchManagementNoticesOutput
{
    /**
     * @var Collection<int, mixed>
     */
    public Collection $value;
    public PaginationMeta $meta;

    /**
     * @param Collection<int, ManagementNotice> $notices
     * @param PaginationMeta                    $meta
     */
    public function __construct(
        Collection $notices,
        PaginationMeta $meta,
    ) {
        $this->value = $notices->map(static function (ManagementNotice $notice) {
            return [
                "id" => $notice->id,
                "title" => $notice->title,
                "content" => $notice->content,
                "publishedAt" => DateUtil::nullableCarbon($notice->published_at)?->format('Y-m-d H:i'),
                "unpublishedAt" => DateUtil::nullableCarbon($notice->unpublished_at)?->format('Y-m-d H:i'),
                "contractAppType" => "",
                "isPublished" => $notice->is_published,
                "createdAt" => DateUtil::nullableCarbon($notice->created_at)?->format('Y-m-d H:i'),
            ];
        });

        $this->meta = $meta;
    }
}
