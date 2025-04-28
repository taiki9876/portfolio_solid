<?php

declare(strict_types=1);

namespace Feature\Infrastructure\Repository;

use App\Infrastructure\Repository\ShopEloquentRepository;
use App\Models\Shop\ShopFactory;
use App\Models\Shop\ShopImage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Arr;
use Tests\Helper\ContractCreator;
use Tests\Helper\ShopCreator;
use Tests\TestCase;

class ShopEloquentRepositoryTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use ShopCreator;

    private ShopEloquentRepository $repository;

    public function setUp(): void
    {
        parent::setUp();
        $this->repository = resolve(ShopEloquentRepository::class);
    }

    public function test_save_新規保存ができること(): void
    {
        //Given
        $contract = $this->createContract();
        $shopImages = [
            ShopImage::init("/path", 1),
            ShopImage::init("/path2", 2),
            ShopImage::init("/path3", 3),
        ];
        $props = $this->shopDummyProps($shopImages);
        $shop = ShopFactory::init($contract, ...$props);

        //When 新規保存
        $this->repository->save($shop);//Then: 新規保存できること
        self::assertDatabaseHas("shops", [
            "id" => $shop->id,
            "contract_id" => $contract->id,
            ...Arr::except($props, ["images"]),
        ]);
        foreach ($shopImages as $shopImage) {
            self::assertDatabaseHas("shop_images", [
                "shop_id" => $shop->id,
                "image_path" => $shopImage->image_path,
                "sort_order" => $shopImage->sort_order,
            ]);
        }//Then: 画像も保存されていること
    }

    public function test_save_更新ができること(): void
    {
        //Given
        $contract = $this->createContract();
        $shop = $this->createShop($contract->id);
        foreach (
            [
                ShopImage::init("/path", 1),
                ShopImage::init("/path2", 2),
                ShopImage::init("/path3", 3),
            ] as $shopImage
        ) {
            $this->createShopImage($shop->id, [
                "image_path" => $shopImage->image_path,
                "sort_order" => $shopImage->sort_order,
            ]);
        }

        //When 更新 (特に画像の更新を重点的にテスト)
        $updateProps = [
            "name" => "変更",
            "app_display_name" => "変更",
            "business_hours" => "10:00-20:00",
            "rest" => "水曜日",
            "tel" => "090-1234-5678",
            "address" => "東京都〇〇区〇〇町1-2-3",
            "prelusion" => "〇〇ショップは〇〇を提供しています。",
            "hp_url" => "https://example.com",
            "map_url" => "https://example.com/map",
            "images" => [//変更なし
                ShopImage::init("/path", 1),
                ShopImage::init("/path2", 2),
                ShopImage::init("/path3", 3),
            ]
        ];
        $shop->edit(...$updateProps);
        $this->repository->save($shop);//Then: 更新できること

        self::assertDatabaseHas("shops", [
            "id" => $shop->id,
            "contract_id" => $contract->id,
            ...Arr::except($updateProps, ["images"]),
        ]);
        foreach ($updateProps["images"] as $shopImage) {
            self::assertDatabaseHas("shop_images", [
                "shop_id" => $shop->id,
                "image_path" => $shopImage->image_path,
                "sort_order" => $shopImage->sort_order,
            ]);
        }

        $updateProps = [
            ...$updateProps,
            "images" => [//path1はそのまま、path2を削除、path3はsort_orderを変更
                ShopImage::init("/path", 1),
                ShopImage::init("/path3", 2),
            ]
        ];
        $shop->edit(...$updateProps);
        $this->repository->save($shop);

        foreach ($updateProps["images"] as $shopImage) {
            self::assertDatabaseHas("shop_images", [
                "shop_id" => $shop->id,
                "image_path" => $shopImage->image_path,
                "sort_order" => $shopImage->sort_order,
            ]);
        }
        self::assertDatabaseMissing("shop_images", [
            "shop_id" => $shop->id,
            "image_path" => "/path2",
        ]);

        $updateProps = [
            ...$updateProps,
            "images" => [],//画像全削除パターン
        ];
        $shop->edit(...$updateProps);
        $this->repository->save($shop);
        self::assertDatabaseMissing("shop_images", ["shop_id" => $shop->id]);
    }

    public function test_save_更新ができること_他店舗の画像データには影響がないこと(): void
    {
        //Given
        $contract = $this->createContract();
        $shop = $this->createShop($contract->id);
        $shopImage = ShopImage::init("/path", 1);
        $this->createShopImage($shop->id, [
            "image_path" => $shopImage->image_path,
            "sort_order" => $shopImage->sort_order,
        ]);

        // 以下データに影響がないことを検証する
        $shop2 = $this->createShop($contract->id);
        $shop2Image = ShopImage::init("/path2", 1);
        $this->createShopImage($shop2->id, [
            "image_path" => $shop2Image->image_path,
            "sort_order" => $shop2Image->sort_order,
        ]);

        $updateProps = [
            "name" => "変更",
            "app_display_name" => "変更",
            "business_hours" => "10:00-20:00",
            "rest" => "水曜日",
            "tel" => "090-1234-5678",
            "address" => "東京都〇〇区〇〇町1-2-3",
            "prelusion" => "〇〇ショップは〇〇を提供しています。",
            "hp_url" => "https://example.com",
            "map_url" => "https://example.com/map",
            "images" => []
        ];
        $shop->edit(...$updateProps);
        $this->repository->save($shop);

        self::assertDatabaseHas("shop_images", [
            "shop_id" => $shop2->id,
            "image_path" => $shop2Image->image_path,
            "sort_order" => $shop2Image->sort_order,
        ]);
    }

    public function test_findById_ID検索できること(): void
    {
        $contract = $this->createContract();
        $shop = $this->createShop($contract->id);

        $actual = $this->repository->findById($shop->id);
        self::assertEquals($shop->id, $actual->id);
    }

    /**
     * @param  array<ShopImage>     $shopImages
     * @return array<string, mixed>
     */
    private function shopDummyProps(array $shopImages): array
    {
        return [
            "name" => "〇〇ショップ",
            "app_display_name" => "〇〇ショップ",
            "business_hours" => "10:00-20:00",
            "rest" => "水曜日",
            "tel" => "090-1234-5678",
            "address" => "東京都〇〇区〇〇町1-2-3",
            "prelusion" => "〇〇ショップは〇〇を提供しています。",
            "hp_url" => "https://example.com",
            "map_url" => "https://example.com/map",
            "images" => $shopImages,
        ];
    }

    public function test_removeBy_店舗を削除できること(): void
    {
        $contract = $this->createContract();
        $shop = $this->createShop($contract->id);
        $otherShop = $this->createShop($contract->id);

        $actual = $this->repository->removeBy($shop);
        self::assertTrue($actual);
        self::assertDatabaseMissing("shops", ["id" => $shop->id]);
        self::assertDatabaseHas("shops", ["id" => $otherShop->id]);
    }
}
