<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\SystemAdmin\FetchManagementNoticesUseCase;

use App\UseCase\SystemAdmin\FetchManagementNoticesUseCase\FetchManagementNoticesInput;
use App\UseCase\SystemAdmin\FetchManagementNoticesUseCase\FetchManagementNoticesUseCase;
use App\Util\DateUtil;
use Carbon\CarbonImmutable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\ManagementNoticeCreator;
use Tests\TestCase;

class FetchManagementNoticesUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ManagementNoticeCreator;

    public function test_execute_運営からのお知らせをリストで取得できること(): void
    {
        // Given
        $searchWord = '検索';
        $notice1 = $this->createPublishedManagementNotice(["title" => "タイトル{$searchWord}タイトル", "published_at" => now()->subDays(2)]); //掲載中のお知らせ
        $notice2 = $this->createUnpublishedManagementNotice(["title" => "未掲載お知らせ", "content" => "本文{$searchWord}本文", "published_at" => now()]);// 未掲載のお知らせ
        $this->createPublishedManagementNotice(["title" => "テストタイトル", "content" => "テスト本文"]);// 検索に引っかからないもの

        $input = new FetchManagementNoticesInput($searchWord);

        // When
        $useCase = resolve(FetchManagementNoticesUseCase::class);
        $output = $useCase->execute($input);

        // Then
        self::assertCount(2, $output->values);
        self::assertEquals("未掲載お知らせ", $output->values->first()["title"]);//掲載日の降順であること

        self::assertEquals(
            [
                'id' => $notice1->id,
                'title' => $notice1->title,
                'content' => $notice1->content,
                'publishedAt' => $notice1->published_at->format(DateUtil::DATE_FORMAT),
                'unpublishedAt' => $notice1->unpublished_at?->format(DateUtil::DATE_FORMAT),
                'isPublished' => $notice1->is_published,
                'currentPublishState' => $notice1->publishingStatus()->value,
                'contractAppType' => $notice1->contract_app_type?->value,
                'createdAt' => CarbonImmutable::parse($notice1->published_at)->format(DateUtil::DATE_FORMAT),
            ],
            $output->values[1],
            "指定の形式で取得できること一つ目"
        );
        self::assertEquals(
            [
                'id' => $notice2->id,
                'title' => $notice2->title,
                'content' => $notice2->content,
                'publishedAt' => $notice2->published_at->format(DateUtil::DATE_FORMAT),
                'unpublishedAt' => $notice2->unpublished_at?->format(DateUtil::DATE_FORMAT),
                'isPublished' => $notice2->is_published,
                'currentPublishState' => $notice2->publishingStatus()->value,
                'contractAppType' => $notice2->contract_app_type?->value,
                'createdAt' => CarbonImmutable::parse($notice2->published_at)->format(DateUtil::DATE_FORMAT),
            ],
            $output->values[0],
            "指定の形式で取得できること二つ目"
        );
    }
}
