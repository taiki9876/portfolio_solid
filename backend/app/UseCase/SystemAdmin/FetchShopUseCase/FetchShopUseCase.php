<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\FetchShopUseCase;

use App\Models\Shop\Shop;
use App\Models\Shop\ShopImage;
use DomainException;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use stdClass;

class FetchShopUseCase
{
    public function execute(int $contractId, int $shopId): FetchShopOutput
    {
        $shop = $this->query($shopId);

        if ($shop->contract_id !== $contractId) {
            throw new DomainException("この契約IDと店舗IDの組み合わせは存在しません");
        }
        return new FetchShopOutput($shop);
    }

    /**
     * @param  int      $shopId
     * @return stdClass
     */
    private function query(int $shopId): stdClass
    {
        $result = DB::table(Shop::TABLE)
            ->select([
                'shops.*',
                DB::raw('count(c.id) as customer_count'),
            ])
            ->leftJoin('customers as c', 'shops.id', '=', 'c.shop_id')
            ->where('shops.id', $shopId)
            ->groupBy('shops.id')
            ->limit(1)
            ->get();

        $shopDetail = $result->first();
        if ($shopDetail === null) {
            throw new DomainException("店舗が存在しません。");
        }

        $shopDetail->images = $this->fetchImages($shopId);

        return $shopDetail;
    }

    /**
     * @param  int                        $shopId
     * @return Collection<int, ShopImage>
     */
    private function fetchImages(int $shopId): Collection
    {
        return ShopImage::query()
            ->where('shop_id', $shopId)
            ->orderBy('sort_order', "asc")
            ->get();
    }
}
