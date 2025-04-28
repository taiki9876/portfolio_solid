<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\FetchShopListUseCase;

use App\Models\Customer\Customer;
use App\Models\Shop\Shop;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use stdClass;

class FetchShopListUseCase
{
    public function execute(int $contractId, FetchShopListInput $input): FetchShopListOutput
    {
        $result = $this->query($contractId, $input);
        return new FetchShopListOutput($result);
    }

    /**
     * @param  int                       $contractId
     * @param  FetchShopListInput        $input
     * @return Collection<int, stdClass>
     */
    private function query(int $contractId, FetchShopListInput $input): Collection
    {
        $searchWord = "%{$input->searchWord}%";
        $shopTable = Shop::TABLE;

        $customerCounts = DB::table(Customer::TABLE)
            ->select('shop_id', DB::raw('COUNT(*) as customer_count'))
            ->where("contract_id", $contractId)
            ->groupBy('shop_id');

        return DB::table($shopTable)
            ->leftJoinSub($customerCounts, 'customer_counts', static function ($join) use ($shopTable) {
                $join->on("{$shopTable}.id", '=', 'customer_counts.shop_id');
            })
            ->select(
                "{$shopTable}.id as id",
                "{$shopTable}.name as shop_name",
                "{$shopTable}.app_display_name as app_display_name",
                "{$shopTable}.business_hours as business_hours",
                "{$shopTable}.rest as rest",
                "{$shopTable}.tel as tel",
                "{$shopTable}.address as address",
                "{$shopTable}.prelusion as prelusion",
                "{$shopTable}.hp_url as hp_url",
                "{$shopTable}.map_url as map_url",
                DB::raw('COALESCE(customer_counts.customer_count, 0) as customer_count'),
                "{$shopTable}.created_at as created_at",
                "{$shopTable}.deleted_at as deleted_at",
            )
            ->where("contract_id", $contractId)
            ->where(static function ($query) use ($shopTable, $searchWord) {
                $query->where("{$shopTable}.name", 'like', $searchWord)
                    ->orWhere("{$shopTable}.app_display_name", 'like', $searchWord);
            })
            ->orderBy("{$shopTable}.id", 'desc')
            ->get();

    }
}
