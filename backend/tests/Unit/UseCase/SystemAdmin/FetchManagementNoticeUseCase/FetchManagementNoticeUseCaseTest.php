<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\SystemAdmin\FetchManagementNoticeUseCase;

use App\UseCase\SystemAdmin\FetchManagementNoticeUseCase\FetchManagementNoticeUseCase;
use App\Util\DateUtil;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\ManagementNoticeCreator;
use Tests\TestCase;

class FetchManagementNoticeUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ManagementNoticeCreator;

    public function test_execute_運営からのお知らせを取得できること(): void
    {
        // Given
        $notice = $this->createPublishedManagementNotice();

        // When
        $useCase = resolve(FetchManagementNoticeUseCase::class);
        $output = $useCase->execute($notice->id);

        // Then
        self::assertEquals(
            [
                "id" => $notice->id,
                "title" => $notice->title,
                "content" => $notice->content,
                "publishedAt" => $notice->published_at->format(DateUtil::DATE_FORMAT),
                "unpublishedAt" => DateUtil::nullableCarbon($notice->unpublished_at)?->format(DateUtil::DATE_FORMAT),
                "isPublished" => $notice->is_published,
                "showPopup" => $notice->show_popup,
                "currentPublishState" => $notice->publishingStatus()->value,
                "contractAppType" => $notice->contract_app_type?->value,
                "createdAt" => $notice->created_at->format(DateUtil::DATE_FORMAT),
            ],
            $output->toArray(),
        );
    }
}
