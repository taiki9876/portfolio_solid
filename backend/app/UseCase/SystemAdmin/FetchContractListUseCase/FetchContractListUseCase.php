<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\FetchContractListUseCase;

use App\Models\Contract\Contract;
use App\Models\Customer\Customer;
use App\Models\Shop\Shop;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use stdClass;

class FetchContractListUseCase
{
    public function execute(FetchContractListInput $input): FetchContractListOutput
    {
        $result = $this->query($input);
        $shopCounts = $this->shopCountQuery();

        return new FetchContractListOutput($result, $shopCounts);
    }

    /**
     * @param  FetchContractListInput    $input
     * @return Collection<int, stdClass>
     */
    private function query(FetchContractListInput $input): Collection
    {
        $searchWord = "%{$input->searchWord}%";
        $contractTable = Contract::TABLE;

        $customerCounts = DB::table(Customer::TABLE)
            ->select('contract_id', DB::raw('COUNT(*) as customer_count'))
            ->groupBy('contract_id');

        return DB::table($contractTable)
            ->leftJoinSub($customerCounts, 'customer_counts', static function ($join) {
                $join->on('contracts.id', '=', 'customer_counts.contract_id');
            })
            ->select(
                "{$contractTable}.id as id",
                "{$contractTable}.name as account_name",
                "{$contractTable}.key as contract_key",
                DB::raw('COALESCE(customer_counts.customer_count, 0) as customer_count'),
                "{$contractTable}.person_in_charge as person_in_charge",
                "{$contractTable}.tel as tel",
                "{$contractTable}.industry as industry",
                "{$contractTable}.contract_status",
                "{$contractTable}.contract_app_type",
            )
            ->where(static function ($query) use ($searchWord) {
                $query->where('contracts.name', 'like', $searchWord)
                    ->orWhere('contracts.key', 'like', $searchWord);
            })
            ->orderBy('contracts.id', 'desc')
            ->get();
    }

    /**
     * キーに契約ID、値に店舗数を持つ配列を返す
     * @return array<string, int>
     */
    private function shopCountQuery(): array
    {
        $contractTable = Contract::TABLE;
        $shopTable = Shop::TABLE;

        return DB::table($contractTable)
            ->select([
                "{$contractTable}.id as contract_id",
                DB::raw('count(shops.id) as shop_count')
            ])
            ->leftJoin($shopTable, "{$contractTable}.id", '=', "{$shopTable}.contract_id")
            ->groupBy("{$contractTable}.id")
            ->get()
            ->mapWithKeys(static function (stdClass $shopCount) {
                return [$shopCount->contract_id => $shopCount->shop_count];
            })
            ->toArray();
    }
}
