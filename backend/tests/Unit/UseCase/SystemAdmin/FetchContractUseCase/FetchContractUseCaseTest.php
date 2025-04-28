<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\SystemAdmin\FetchContractUseCase;

use App\UseCase\SystemAdmin\FetchContractUseCase\FetchContractOutput;
use App\UseCase\SystemAdmin\FetchContractUseCase\FetchContractUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\Helper\ShopCreator;
use Tests\TestCase;

class FetchContractUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use CustomerCreator;
    use AdminCreator;
    use ShopCreator;

    private FetchContractUseCase $useCase;

    public function setUp(): void
    {
        parent::setUp();
        $this->useCase = resolve(FetchContractUseCase::class);
    }

    public function test_execute_特定の契約情報を取得すること(): void
    {
        //Given
        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);
        $customerCount = 2;
        for ($i = 0; $i < $customerCount; $i++) {
            $this->createCustomer($contract->id);
        }
        $shopCount = 1;
        for ($i = 0; $i < $shopCount; $i++) {
            $this->createShop($contract->id);
        }

        //When
        $actual = $this->useCase->execute($contract->id);

        //Then
        self::assertInstanceOf(FetchContractOutput::class, $actual);
        self::assertEqualsCanonicalizing(
            [
                "name" => $contract->name,
                "key" => $contract->key,
                "key_alias" => $contract->key_alias,
                "industry" => $contract->industry,
                "person_in_charge" => $contract->person_in_charge,
                "tel" => $contract->tel,
                "email" => $contract->email,
                "memo" => $contract->memo,
                "contract_status" => $contract->contract_status->value,
                "contract_app_type" => $contract->contract_app_type->value,
                "customer_count" => $customerCount,
                "shop_count" => $shopCount,
            ],
            $actual->toContractInfo(),
        );

        self::assertEqualsCanonicalizing(
            [
                "admin_login_id" => $admin->login_id,
                "password" => "********",
            ],
            $actual->toOwnerAdminInfo(),
        );
    }
}
