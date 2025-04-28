<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Customer\FetchCustomerUseCase;

use App\Models\Customer\ValueObjects\SexEnum;
use App\Models\Shared\Pagination\PaginationMeta;
use Illuminate\Support\Collection;
use stdClass;

readonly class FetchCustomerOutput
{
    /**
     * @var Collection<int, mixed>
     */
    public Collection $value;
    public PaginationMeta $meta;

    /**
     * @param Collection<int, stdClass> $customers
     * @param PaginationMeta            $meta
     */
    public function __construct(
        Collection $customers,
        PaginationMeta $meta,
    ) {
        $this->value = $customers->map(static function (stdClass $customer) {
            //TODO: 固定値を返しているものは仕様が固まっていないため暫定対応
            return [
                "customerCode" => "C0001",
                "customerNumber" => null,
                "name" => $customer->last_name . " " . $customer->first_name,
                "birthDate" => $customer->birth_date,
                "sex" => SexEnum::from($customer->sex)->description(),
                "rank" => "一般会員",
                "parentCustomer" => "D0001",
                "install" => true,
                "entryAt" => $customer->entry_at,
                "lastLoginAt" => "2021-09-01",
                "lastVisitAt" => "2021-09-01",
                "point" => 100,
            ];
        });

        $this->meta = $meta;
    }
}
