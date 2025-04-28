<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\ManagementNotice\FetchManagementNoticesUseCase;

use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\UseCase\Admin\ManagementNotices\FetchManagementNoticesUseCase\FetchManagementNoticesInput;
use App\UseCase\Admin\ManagementNotices\FetchManagementNoticesUseCase\FetchManagementNoticesUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\ManagementNoticeCreator;
use Tests\TestCase;

class FetchManagementNoticesUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ManagementNoticeCreator;
    use ContractCreator;
    use AdminCreator;

    public function test_execute_運営からのお知らせを取得できること(): void
    {
        // Given 掲載状態のお知らせを作成
        $contract = $this->createContract(overrideParams: ["contract_app_type" => ContractAppTypeEnum::NATIVE_APP->value]);
        $admin = $this->createStoreAdmin($contract->id);

        $publishedNotices = collect([
            $this->createManagementNotice(["is_published" => true]),
            $this->createManagementNotice(["published_at" => now()->subMinute()]),
            $this->createManagementNotice(["unpublished_at" => now()->addMinute()]),
            $this->createManagementNotice(["published_at" => now()->subMinute(), "unpublished_at" => now()->addMinute()]),
        ]);

        //これらは掲載状態ではないので取得できない想定のお知らせ
        $this->createManagementNotice(["is_published" => false]);
        $this->createManagementNotice(["published_at" => now()->addDay()]);
        $this->createManagementNotice(["unpublished_at" => now()->subDay()]);
        $this->createManagementNotice(["is_published" => false, "published_at" => now()->subMinute()]);

        $input = new FetchManagementNoticesInput(
            perPage: '20',
            page: '1',
        );

        // When
        $useCase = resolve(FetchManagementNoticesUseCase::class);
        $output = $useCase->execute($input, $admin);

        // Then
        self::assertEquals($publishedNotices->count(), $output->value->count());
        self::assertEquals(
            $publishedNotices->pluck('title')->sort()->values(),
            $output->value->pluck('title')->sort()->values(),
        );
    }

    public function test_execute_運営からのお知らせを取得できること_アプリタイプのフィルタリングが有効であること(): void
    {
        // Given 掲載状態のお知らせを作成
        $contract = $this->createContract(overrideParams: ["contract_app_type" => ContractAppTypeEnum::NATIVE_APP->value]);
        $admin = $this->createStoreAdmin($contract->id);

        $publishedNotices = collect([
            $this->createManagementNotice(["contract_app_type" => null]),
            $this->createManagementNotice(["contract_app_type" => ContractAppTypeEnum::NATIVE_APP->value]),
        ]);
        $this->createManagementNotice(["contract_app_type" => ContractAppTypeEnum::LINE_MINI_APP->value]);

        // When
        $useCase = resolve(FetchManagementNoticesUseCase::class);
        $output = $useCase->execute(
            new FetchManagementNoticesInput(
                perPage: '20',
                page: '1',
            ),
            $admin
        );

        // Then
        self::assertEquals($publishedNotices->count(), $output->value->count());
        self::assertEquals(
            $publishedNotices->pluck('title')->sort()->all(),
            $output->value->pluck('title')->sort()->all(),
        );
    }

    public function test_execute_想定する構造で取得できること_ページネーションデータも取得できること(): void
    {
        $contract = $this->createContract(overrideParams: ["contract_app_type" => ContractAppTypeEnum::NATIVE_APP->value]);
        $admin = $this->createStoreAdmin($contract->id);
        //Given
        $total = "12";
        $perPage = "10";
        $lastPage = "2";
        $page = "1";
        for ($i = 0; $i < $total; $i++) {
            $this->createPublishedManagementNotice();
        }

        //When
        $useCase = resolve(FetchManagementNoticesUseCase::class);
        $output = $useCase->execute(
            new FetchManagementNoticesInput($perPage, $page),
            $admin,
        );

        //Then
        self::assertEquals($perPage, $output->value->count());
        self::assertEquals($total, $output->meta->total);
        self::assertEquals($perPage, $output->meta->perPage);
        self::assertEquals($lastPage, $output->meta->lastPage);
        self::assertEquals($page, $output->meta->page);

        self::assertEquals(
            [
                "id",
                "title",
                "content",
                "publishedAt",
                "unpublishedAt",
                "contractAppType",
                "isPublished",
                "createdAt",
            ],
            array_keys($output->value->first())
        );
    }
}
