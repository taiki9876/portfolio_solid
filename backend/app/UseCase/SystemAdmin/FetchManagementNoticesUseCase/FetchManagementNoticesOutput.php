<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\FetchManagementNoticesUseCase;

use App\Models\ManagementNotice\ManagementNotice;
use App\Util\DateUtil;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Collection;

readonly class FetchManagementNoticesOutput
{
    /**
     * @var Collection<int, mixed>
     */
    public Collection $values;

    /**
     * @param EloquentCollection<int, ManagementNotice> $notices
     */
    public function __construct(
        EloquentCollection $notices,
    ) {
        $this->values = $notices->map(static function (ManagementNotice $notice) {
            $publishedAt = CarbonImmutable::parse($notice->published_at);
            $unpublishedAt = DateUtil::nullableCarbon($notice->unpublished_at);
            return [
                'id' => $notice->id,
                'title' => $notice->title,
                'content' => $notice->content,
                'publishedAt' => $publishedAt->format(DateUtil::DATE_FORMAT),
                'unpublishedAt' => $unpublishedAt?->format(DateUtil::DATE_FORMAT),
                'isPublished' => $notice->is_published,
                'currentPublishState' => $notice->publishingStatus()->value,
                'contractAppType' => $notice->contract_app_type?->value,
                'createdAt' => CarbonImmutable::parse($notice->published_at)->format(DateUtil::DATE_FORMAT),
            ];
        });
    }
}
