<?php

declare(strict_types=1);

namespace App\Infrastructure\Repository;

use App\Models\Customer\Customer;
use Carbon\CarbonImmutable;

class CustomerEloquentRepository
{
    /**
     * @param  Customer $customer
     * @return Customer
     */
    public function save(Customer $customer): Customer
    {
        if ($customer->id === null) {
            $customer->save();
        } else {
            $customer->updated_at = CarbonImmutable::now();
            Customer::query()
                ->where('id', $customer->id)
                ->update($customer->toArray());
        }
        return $customer->refresh();
    }

    public function findById(int $id): ?Customer
    {
        return Customer::query()->where("id", $id)->first();
    }
}
