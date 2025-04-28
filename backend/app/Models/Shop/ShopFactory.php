<?php

declare(strict_types=1);

namespace App\Models\Shop;

use App\Models\Contract\Contract;
use Carbon\CarbonImmutable;

class ShopFactory
{
    /**
     * @param  Contract         $contract
     * @param  string           $name
     * @param  string|null      $app_display_name
     * @param  string|null      $business_hours
     * @param  string|null      $rest
     * @param  string|null      $tel
     * @param  string|null      $address
     * @param  string|null      $prelusion
     * @param  string|null      $hp_url
     * @param  string|null      $map_url
     * @param  array<ShopImage> $images
     * @return Shop
     */
    public static function init(
        Contract $contract,
        string $name,
        string|null $app_display_name,
        string|null $business_hours,
        string|null $rest,
        string|null $tel,
        string|null $address,
        string|null $prelusion,
        string|null $hp_url,
        string|null $map_url,
        array $images,
    ): Shop {
        $shop = new Shop();
        $shop->contract_id = $contract->id;
        $shop->name = $name;
        $shop->app_display_name = $app_display_name;
        $shop->business_hours = $business_hours;
        $shop->rest = $rest;
        $shop->tel = $tel;
        $shop->address = $address;
        $shop->prelusion = $prelusion;

        $shop->hp_url = $hp_url;
        $shop->map_url = $map_url;
        $shop->created_at = CarbonImmutable::now();
        $shop->updated_at = CarbonImmutable::now();
        $shop->deleted_at = null;

        $shop->images->push(...$images);

        return $shop;
    }
}
