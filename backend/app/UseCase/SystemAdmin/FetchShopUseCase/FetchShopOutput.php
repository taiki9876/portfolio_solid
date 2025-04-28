<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\FetchShopUseCase;

use App\Models\Shop\ShopImage;
use stdClass;

readonly class FetchShopOutput
{
    public function __construct(
        private stdClass $shop,
    ) {
    }

    /**
     * @return array{
     *     id: int,
     *     name: string,
     *     appDisplayName: string|null,
     *     businessHours: string|null,
     *     rest: string|null,
     *     tel: string|null,
     *     address: string|null,
     *     prelusion: string|null,
     *     hpUrl: string|null,
     *     mapUrl: string|null,
     *     createdAt: string,
     *     deletedAt: string|null,
     *     customerCount: int,
     *     images: array{
     *         id: int,
     *         path: string,
     *         sortOrder: int,
     *     },
     * }
     */
    public function toArray(): array
    {
        $shop = $this->shop;
        return [
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
            "createdAt" => $shop->created_at,
            "deletedAt" => $shop->deleted_at,
            "customerCount" => $shop->customer_count,
            "images" => $shop->images->map(static function (ShopImage $image) {
                return [
                    "id" => $image->id,
                    "path" => $image->absolutePath(),
                    "sortOrder" => $image->sort_order,
                ];
            })->toArray(),
        ];
    }
}
