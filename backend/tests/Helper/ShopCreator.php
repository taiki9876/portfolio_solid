<?php

declare(strict_types=1);

namespace Tests\Helper;

use App\Models\Shop\Shop;
use App\Models\Shop\ShopImage;

trait ShopCreator
{
    /**
     * @param  int                  $contractId
     * @param  array<string, mixed> $overrideParams
     * @return Shop
     */
    public function createShop(int $contractId, array $overrideParams = []): Shop
    {
        $params = array_merge(["contract_id" => $contractId], $overrideParams);
        return Shop::factory()->create($params);
    }

    /**
     * @param  int                  $shopId
     * @param  array<string, mixed> $overrideParams
     * @return ShopImage
     */
    public function createShopImage(int $shopId, array $overrideParams = []): ShopImage
    {
        $params = array_merge(["shop_id" => $shopId], $overrideParams);
        return ShopImage::factory()->create($params);
    }
}
