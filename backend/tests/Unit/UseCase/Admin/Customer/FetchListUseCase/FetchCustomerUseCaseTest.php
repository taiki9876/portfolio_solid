<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\Customer\FetchListUseCase;

use App\Models\Admin\Admin;
use App\UseCase\Admin\Customer\FetchCustomerUseCase\FetchCustomerInput;
use App\UseCase\Admin\Customer\FetchCustomerUseCase\FetchCustomerUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\TestCase;

class FetchCustomerUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use AdminCreator;
    use ContractCreator;
    use CustomerCreator;

    private FetchCustomerUseCase $useCase;

    public function setUp(): void
    {
        parent::setUp();
        $this->useCase = new FetchCustomerUseCase();
    }

    public function test_execute_別契約の会員は取得されないこと(): void
    {
        //Given
        $admin = $this->createAccount();
        $customer = $this->createCustomer($admin->contract_id);

        $otherAdmin = $this->createAccount();
        $this->createCustomer($otherAdmin->contract_id);

        //When
        $output = $this->useCase->execute($this->validInput(), $admin->contract_id);

        //Then
        self::assertCount(1, $output->value);
        self::assertEquals(
            $customer->last_name . " " . $customer->first_name,
            $output->value->first()["name"]
        );
    }

    public function test_execute_想定する構造で取得できること_ページネーションデータも取得できること(): void
    {
        //Given
        $admin = $this->createAccount();
        $total = "35";
        $perPage = "10";
        $lastPage = "4";
        $page = "2";
        for ($i = 0; $i < $total; $i++) {
            $this->createCustomer($admin->contract_id);
        }

        //When
        $output = $this->useCase->execute(
            $this->validInput(["perPage" => $perPage, "page" => $page]),
            $admin->contract_id,
        );

        //Then
        self::assertEquals($perPage, $output->value->count());
        self::assertEquals($total, $output->meta->total);
        self::assertEquals($perPage, $output->meta->perPage);
        self::assertEquals($lastPage, $output->meta->lastPage);
        self::assertEquals($page, $output->meta->page);

        self::assertEquals(
            [
                "customerCode",
                "customerNumber",
                "name",
                "birthDate",
                "sex",
                "rank",
                "parentCustomer",
                "install",
                "entryAt",
                "lastLoginAt",
                "lastVisitAt",
                "point",
            ],
            array_keys($output->value->first())
        );
    }

    private function createAccount(): Admin
    {
        $contract = $this->createContract();
        return $this->createSupportAdmin($contract->id);
    }

    /**
     * @param array{
     *     perPage?: string,
     *     page?: string,
     *     sortBy?: string|null,
     *     sortOrder?: string|null,
     *     searchWord?: string|null,
     * } $override
     * @return FetchCustomerInput
     */
    private function validInput(array $override = []): FetchCustomerInput
    {
        $request = [
            'perPage' => "10",
            'page' => "1",
            'sortBy' => null,
            'sortOrder' => null,
            'searchWord' => null,
            ...$override
        ];
        return new FetchCustomerInput(...$request);
    }
}
