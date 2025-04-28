<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\SystemAdmin\EditShopUseCase;

use App\Models\Shop\Shop;
use App\UseCase\SystemAdmin\EditShopUseCase\EditShopImageInput;
use App\UseCase\SystemAdmin\EditShopUseCase\EditShopInput;
use App\UseCase\SystemAdmin\EditShopUseCase\EditShopUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Tests\Helper\ContractCreator;
use Tests\Helper\ShopCreator;
use Tests\TestCase;

class EditShopUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use ShopCreator;

    public function test_execute_店舗を作成できること(): void
    {
        // Given
        $contract = $this->createContract();
        $shop = $this->createShop($contract->id, ["updated_at" => now()->subDay()]);

        $params = [
            "name" => "新ショップ名",
            "appDisplayName" => "表示店舗名",
            "businessHours" => "10:00",
            "rest" => "なし",
            "tel" => "0000000000",
            "address" => "住所",
            "prelusion" => "紹介文",
            "hpUrl" => "https://example.com",
            "mapUrl" => "https://example.com/map",
        ];

        // When
        $output = resolve(EditShopUseCase::class)->execute(
            $contract->id,
            $shop->id,
            new EditShopInput(...$params),
            new EditShopImageInput((new Request())->merge(["images" => []]))
        );

        // Then
        self::assertInstanceOf(Shop::class, $output);
        self::assertDatabaseHas(Shop::TABLE, [
            "id" => $shop->id,
            "contract_id" => $contract->id,
            "name" => $params["name"],
            "app_display_name" => $params["appDisplayName"],
            "business_hours" => $params["businessHours"],
            "rest" => $params["rest"],
            "tel" => $params["tel"],
            "address" => $params["address"],
            "prelusion" => $params["prelusion"],
            "hp_url" => $params["hpUrl"],
            "map_url" => $params["mapUrl"],
            "updated_at" => now(),
        ]);
    }
}
