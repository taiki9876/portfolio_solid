<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\Customer\UpdateMemoUseCase;

use App\UseCase\Admin\Customer\UpdateMemoUseCase\UpdateMemoInput;
use App\UseCase\Admin\Customer\UpdateMemoUseCase\UpdateMemoUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\TestCase;

class UpdateMemoUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use AdminCreator;
    use ContractCreator;
    use CustomerCreator;

    private UpdateMemoUseCase $useCase;

    public function setUp(): void
    {
        parent::setUp();
        $this->useCase = resolve(UpdateMemoUseCase::class);
    }

    public function test_execute_メモ情報を更新できること(): void
    {
        //Given
        $contract = $this->createContract();
        $customer = $this->createCustomer($contract->id);
        $customerDummy = $this->createCustomer($contract->id);//対象外の会員

        self::assertDatabaseHas("customers", [
            "id" => $customer->id,
            "memo" => null,
        ]);
        self::assertDatabaseHas("customers", [
            "id" => $customerDummy->id,
            "memo" => null,
        ]);

        //When
        $this->useCase->execute(new UpdateMemoInput($customer->id, "新しいメモ"));

        //Then
        self::assertDatabaseHas("customers", [
            "id" => $customer->id,
            "memo" => "新しいメモ",
        ]);
        self::assertDatabaseHas("customers", [
            "id" => $customerDummy->id,
            "memo" => null,
        ]);
    }
}
