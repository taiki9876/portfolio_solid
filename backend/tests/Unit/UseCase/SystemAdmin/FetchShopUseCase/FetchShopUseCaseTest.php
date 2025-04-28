<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\SystemAdmin\FetchShopUseCase;

use App\UseCase\SystemAdmin\FetchShopUseCase\FetchShopOutput;
use App\UseCase\SystemAdmin\FetchShopUseCase\FetchShopUseCase;
use App\Util\DateUtil;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\ContractCreator;
use Tests\Helper\ShopCreator;
use Tests\TestCase;

class FetchShopUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use ShopCreator;

    public function test_execute_店舗の詳細情報を取得できること(): void
    {
        // Given
        $contract = $this->createContract();
        $shop = $this->createShop($contract->id);
        $image = $this->createShopImage($shop->id);

        // When
        $useCase = resolve(FetchShopUseCase::class);
        $output = $useCase->execute($contract->id, $shop->id);

        // Then
        self::assertInstanceOf(FetchShopOutput::class, $output);
        self::assertEqualsCanonicalizing(
            [
                "id" => $shop->id,
                "name" => $shop->name,
                "appDisplayName" => $shop->app_display_name,
                "businessHours" => $shop->business_hours,
                "rest" => $shop->rest,
                "tel" => $shop->tel,
                "address" => $shop->address,
                "prelusion" => $shop->prelusion,
                "hpUrl" => $shop->hp_url,
                "mapUrl" => $shop->map_url,
                "createdAt" => $shop->created_at->format(DateUtil::DATE_FORMAT),
                "deletedAt" => null,
                "customerCount" => 0,
                "images" => [["id" => $image->id, "path" => $image->absolutePath(), "sortOrder" => $image->sort_order]],
            ],
            $output->toArray(),
        );
    }
}
