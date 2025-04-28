<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\Home\FetchAggregationSummaryUseCase;

use App\UseCase\Admin\Home\FetchAggregationSummaryUseCase\FetchAggregationSummaryUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\ManagementNoticeCreator;
use Tests\TestCase;

class FetchAggregationSummaryUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ManagementNoticeCreator;
    use ContractCreator;
    use AdminCreator;

    public function test_execute_トップページの集計情報を取得できること(): void
    {
        //Given
        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);

        $this->createNotices(FetchAggregationSummaryUseCase::NOTICE_LIMIT + 1);//お知らせを作成

        //When
        $useCase = resolve(FetchAggregationSummaryUseCase::class);
        $output = $useCase->execute($admin);

        //Then
        self::assertCount(FetchAggregationSummaryUseCase::NOTICE_LIMIT, $output->managementNotices());
        $someNotice = $output->managementNotices()[0];
        self::assertArrayHasKey("id", $someNotice);
        self::assertArrayHasKey("title", $someNotice);
        self::assertArrayHasKey("publishedAt", $someNotice);
    }

    private function createNotices(int $noticeCount): void
    {
        for ($i = 0; $i < $noticeCount; $i++) {
            $this->createPublishedManagementNotice();
        }
    }
}
