<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\SystemAdmin\FetchShopListUseCase;

use App\UseCase\SystemAdmin\FetchShopListUseCase\FetchShopListInput;
use App\UseCase\SystemAdmin\FetchShopListUseCase\FetchShopListOutput;
use App\UseCase\SystemAdmin\FetchShopListUseCase\FetchShopListUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\Helper\ShopCreator;
use Tests\TestCase;

class FetchShopListUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use ShopCreator;
    use CustomerCreator;

    public function test_execute_店舗リストを取得できること(): void
    {
        // Given
        $searchWord = "search";
        $contract = $this->createContract();

        $shop1 = $this->createShop($contract->id, ["name" => "{$searchWord}_name1"]);
        $shop1CustomerCount = 5;
        for ($i = 0; $i < $shop1CustomerCount; $i++) {
            $this->createCustomer($contract->id, ["shop_id" => $shop1->id]);
        }

        $shop2 = $this->createShop($contract->id, ["name" => "{$searchWord}_name2"]);
        $shop2CustomerCount = 3;
        for ($i = 0; $i < $shop2CustomerCount; $i++) {
            $this->createCustomer($contract->id, ["shop_id" => $shop2->id]);
        }

        $this->createShop($contract->id, ["name" => "検索に引っかからない店舗"]);
        $otherContract = $this->createContract();
        $this->createShop($otherContract->id, ["name" => "{$searchWord}_name3"]);//別契約のshop

        // When
        $useCase = resolve(FetchShopListUseCase::class);
        $output = $useCase->execute($contract->id, new FetchShopListInput($searchWord));

        // Then
        self::assertInstanceOf(FetchShopListOutput::class, $output);
        self::assertCount(2, $output->values);

        $shop1Output = $output->values->firstWhere("id", $shop1->id);
        self::assertEqualsCanonicalizing(
            [
                "id" => $shop1->id,
                "name" => $shop1->name,
                "appDisplayName" => $shop1->app_display_name,
                "businessHours" => $shop1->business_hours,
                "rest" => $shop1->rest,
                "tel" => $shop1->tel,
                "address" => $shop1->address,
                "prelusion" => $shop1->prelusion,
                "hpUrl" => $shop1->hp_url,
                "mapUrl" => $shop1->map_url,
                "customerCount" => $shop1CustomerCount,
                "created_at" => $shop1->created_at->toDateTimeString(),
                "deleted_at" => null,
            ],
            $shop1Output
        );

        $shop2Output = $output->values->firstWhere("id", $shop2->id);
        self::assertEqualsCanonicalizing(
            [
                "id" => $shop2->id,
                "name" => $shop2->name,
                "appDisplayName" => $shop2->app_display_name,
                "businessHours" => $shop2->business_hours,
                "rest" => $shop2->rest,
                "tel" => $shop2->tel,
                "address" => $shop2->address,
                "prelusion" => $shop2->prelusion,
                "hpUrl" => $shop2->hp_url,
                "mapUrl" => $shop2->map_url,
                "customerCount" => $shop2CustomerCount,
                "created_at" => $shop2->created_at->toDateTimeString(),
                "deleted_at" => null,
            ],
            $shop2Output
        );
    }
}
