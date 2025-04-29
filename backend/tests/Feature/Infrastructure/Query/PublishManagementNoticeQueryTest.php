<?php

declare(strict_types=1);

namespace Feature\Infrastructure\Query;

use App\Infrastructure\Query\PublishManagementNoticeQuery;
use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\ManagementNoticeCreator;
use Tests\TestCase;

class PublishManagementNoticeQueryTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use AdminCreator;
    use ManagementNoticeCreator;

    private PublishManagementNoticeQuery $queryClass;

    public function setUp(): void
    {
        parent::setUp();
        $this->queryClass = new PublishManagementNoticeQuery();
    }

    public function test_query_公開中の運営からのお知らせのみ取得できること(): void
    {
        // Given
        $contract = $this->createContract(overrideParams: ["contract_app_type" => ContractAppTypeEnum::NATIVE_APP]);
        $admin = $this->createStoreAdmin($contract->id);

        $publishedNotice = collect([
            $this->createManagementNotice([
                "is_published" => true, "contract_app_type" => ContractAppTypeEnum::NATIVE_APP, "published_at" => now()->subDays(1), "unpublished_at" => null]),
            $this->createManagementNotice([
                "is_published" => true, "contract_app_type" => null, "published_at" => now()->subDays(1), "unpublished_at" => null]),
            $this->createManagementNotice([
                "is_published" => true, "contract_app_type" => ContractAppTypeEnum::NATIVE_APP, "published_at" => now()->subDays(1), "unpublished_at" => now()->addDay()]),
        ]);

        //Given: unpublished
        $this->createManagementNotice([
            "is_published" => true, "contract_app_type" => ContractAppTypeEnum::LINE_MINI_APP, "published_at" => now()->subDays(1), "unpublished_at" => null]);
        $this->createManagementNotice([
            "is_published" => true, "contract_app_type" => null, "published_at" => now()->subDays(1), "unpublished_at" => now()->subDay()]);
        $this->createManagementNotice([
            "is_published" => true, "contract_app_type" => null, "published_at" => now()->addDay(), "unpublished_at" => null]);
        $this->createManagementNotice([
            "is_published" => false, "contract_app_type" => null, "published_at" => now()->subDays(1), "unpublished_at" => null]);

        //When
        $actual = $this->queryClass->query($contract->contract_app_type)->get();

        // Then
        self::assertCount($publishedNotice->count(), $actual);
    }
}
