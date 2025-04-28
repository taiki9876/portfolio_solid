<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\FetchShopListUseCase;

use Illuminate\Support\Collection;
use stdClass;

readonly class FetchShopListOutput
{
    /**
     * @var Collection<int, mixed>
     */
    public Collection $values;

    /**
     * @param Collection<int, stdClass> $shops
     */
    public function __construct(
        Collection $shops
    ) {
        $this->values = $shops->map(static function (stdClass $shop) {
            return [
                "id" => $shop->id,
                "name" => $shop->shop_name,
                "appDisplayName" => $shop->app_display_name,
                "businessHours" => $shop->business_hours,
                "rest" => $shop->rest,
                "tel" => $shop->tel,
                "address" => $shop->address,
                "prelusion" => $shop->prelusion,
                "hpUrl" => $shop->hp_url,
                "mapUrl" => $shop->map_url,
                "customerCount" => $shop->customer_count,
                "createdAt" => $shop->created_at,
                "deletedAt" => $shop->deleted_at,
            ];
        });
    }
}
