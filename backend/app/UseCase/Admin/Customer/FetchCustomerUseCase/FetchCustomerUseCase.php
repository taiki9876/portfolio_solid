<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Customer\FetchCustomerUseCase;

use App\Models\Customer\Customer;
use App\Models\Shared\Pagination\PaginationMeta;
use DB;
use Illuminate\Database\Query\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use stdClass;

class FetchCustomerUseCase
{
    /**
     * @param  FetchCustomerInput  $input
     * @param  int                 $contractId
     * @return FetchCustomerOutput
     */
    public function execute(FetchCustomerInput $input, int $contractId): FetchCustomerOutput
    {
        return $this->query($input, $contractId);
    }

    //TODO: 退会済みの会員も取得している。 ->仕様は要検討
    private function query(FetchCustomerInput $input, int $contractId): FetchCustomerOutput
    {
        /** @var Builder $query */
        $query = DB::table(Customer::TABLE)->where('contract_id', $contractId);

        // 検索条件を追加
        if (!empty($input->searchWord)) {
            $query->where(static function (Builder $q) use ($input) {
                $q->where('first_name', 'like', "%$input->searchWord%")
                    ->orWhere('last_name', 'like', "%$input->searchWord%")
                    ->orWhere('first_name_kana', 'like', "%$input->searchWord%")
                    ->orWhere('last_name_kana', 'like', "%$input->searchWord%");
            });
        }

        // 並び順を追加
        if ($input->sortBy !== null) {
            $query->orderBy($input->sortBy, $input->sortOrder ?? "desc");
        }

        /** @var LengthAwarePaginator<stdClass> $customers */
        $customers = $query->paginate($input->perPage, ['*'], 'page', $input->page);
        return new FetchCustomerOutput(
            $customers->collect(),
            new PaginationMeta(
                total: $customers->total(),
                perPage: $customers->perPage(),
                page: $customers->currentPage(),
            )
        );
    }
}
