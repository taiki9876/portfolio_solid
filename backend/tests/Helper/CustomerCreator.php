<?php

declare(strict_types=1);

namespace Tests\Helper;

use App\Models\Customer\Customer;

trait CustomerCreator
{
    /**
     * @param  int                  $contractId
     * @param  array<string, mixed> $overrideParams
     * @return Customer
     */
    public function createCustomer(
        int $contractId,
        array $overrideParams = [],
    ): Customer {
        $params = array_merge(["contract_id" => $contractId], $overrideParams);
        return Customer::factory()->create($params);
    }
}
