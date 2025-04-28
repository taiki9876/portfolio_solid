<?php

declare(strict_types=1);

namespace Feature\Admin\Api\SystemAdmin;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Symfony\Component\HttpFoundation\Response;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\ShopCreator;
use Tests\TestCase;

class SystemAdminShopControllerTest extends TestCase
{
    use RefreshDatabase;
    use AdminCreator;
    use ContractCreator;
    use ShopCreator;

    public const VALID_INPUT = [
        "name" => "name",
        "app_display_name" => "app_display_name",
        "business_hours" => "business_hours",
        "rest" => "rest",
        "tel" => "tel",
        "address" => "address",
        "prelusion" => "prelusion",
        "hp_url" => "hp_url",
        "map_url" => "map_url",
    ];

    public function test_fetchShopList_店舗情報コレクションを取得できること(): void
    {
        //Given
        $contract = $this->createContract();
        $systemAdmin = $this->createSystemAdmin();

        $this->actingAs($systemAdmin, "admin");

        //When
        $response = $this->get(route("admin.api.systemAdmin.fetchShopList", ["contract_id" => $contract->id]));

        //Then
        $response->assertStatus(Response::HTTP_OK)
            ->assertJsonStructure(["shops" => []]);

        // システム管理者以外はアクセスできないこと
        $storeAdmin = $this->createStoreAdmin($contract->id);
        $this->actingAs($storeAdmin, "admin");
        $this->get(route("admin.api.systemAdmin.fetchShopList", ["contract_id" => $contract->id]))
            ->assertStatus(Response::HTTP_FORBIDDEN);
    }

    public function test_fetchShop_店舗情報を取得できること(): void
    {
        //Given
        $contract = $this->createContract();
        $systemAdmin = $this->createSystemAdmin();

        $shop = $this->createShop($contract->id);
        $this->actingAs($systemAdmin, "admin");

        //When
        $response = $this->get(route("admin.api.systemAdmin.fetchShop", ["contract_id" => $contract->id, "shop_id" => $shop->id]));

        //Then
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_createShop_店舗情報を作成できること(): void
    {
        //Given
        $contract = $this->createContract();
        $systemAdmin = $this->createSystemAdmin();

        $shop = $this->createShop($contract->id);
        $this->actingAs($systemAdmin, "admin");

        //When
        $response = $this->post(
            route("admin.api.systemAdmin.createShop", ["contract_id" => $contract->id, "shop_id" => $shop->id]),
            self::VALID_INPUT,
        );

        //Then
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_editShop_店舗情報を変更できること(): void
    {
        //Given
        $contract = $this->createContract();
        $systemAdmin = $this->createSystemAdmin();

        $shop = $this->createShop($contract->id);
        $this->actingAs($systemAdmin, "admin");

        //When
        $response = $this->post(
            route("admin.api.systemAdmin.editShop", ["contract_id" => $contract->id, "shop_id" => $shop->id]),
            self::VALID_INPUT,
        );

        //Then
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_deleteShop_店舗情報を削除できること(): void
    {
        //Given
        $contract = $this->createContract();
        $systemAdmin = $this->createSystemAdmin();
        $shop = $this->createShop($contract->id);

        $this->actingAs($systemAdmin, "admin");

        //When
        $response = $this->delete(route("admin.api.systemAdmin.deleteShop", ["contract_id" => $contract->id, "shop_id" => $shop->id]));

        //Then
        $response->assertStatus(Response::HTTP_OK);
    }
}
