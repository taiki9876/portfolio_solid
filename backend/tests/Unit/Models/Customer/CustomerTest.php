<?php

declare(strict_types=1);

namespace Tests\Unit\Models\Customer;

use Carbon\CarbonImmutable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\TestCase;

class CustomerTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use CustomerCreator;

    public function test_age_年齢を正しく計算できること(): void
    {
        //Given
        $contract = $this->createContract();

        $testCase = [
            ["birth_date" => "2000-01-01", "expected" => 25],
            ["birth_date" => "2000-02-01", "expected" => 25],
            ["birth_date" => "2000-02-02", "expected" => 25],
            ["birth_date" => "2000-02-03", "expected" => 24],
            ["birth_date" => "2000-02-04", "expected" => 24],
            ["birth_date" => "2001-02-04", "expected" => 23],
        ];

        CarbonImmutable::setTestNow("2025-02-02");

        foreach ($testCase as $test) {
            $customer = $this->createCustomer($contract->id, ["birth_date" => $test["birth_date"]]);

            //When
            $age = $customer->age();

            //Then
            self::assertEquals($test["expected"], $age);
        }
    }
}
