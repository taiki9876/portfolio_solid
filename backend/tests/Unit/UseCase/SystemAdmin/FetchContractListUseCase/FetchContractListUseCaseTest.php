<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\SystemAdmin\FetchContractListUseCase;

use App\UseCase\SystemAdmin\FetchContractListUseCase\FetchContractListInput;
use App\UseCase\SystemAdmin\FetchContractListUseCase\FetchContractListOutput;
use App\UseCase\SystemAdmin\FetchContractListUseCase\FetchContractListUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\Helper\ShopCreator;
use Tests\TestCase;

class FetchContractListUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use CustomerCreator;
    use ShopCreator;

    private FetchContractListUseCase $useCase;

    public function setUp(): void
    {
        parent::setUp();
        $this->useCase = resolve(FetchContractListUseCase::class);
    }

    public function test_execute_契約情報と会員数を検索取得できること(): void
    {
        //Given 3つの契約
        $searchWord = "search";
        $contract1 = $this->createContract(overrideParams: ["name" => "{$searchWord}_name1"]);
        $contract1CustomerCount = 15;
        for ($i = 0; $i < $contract1CustomerCount; $i++) {
            $this->createCustomer($contract1->id);
        }
        $contract1ShopCount = 2;
        for ($i = 0; $i < $contract1ShopCount; $i++) {
            $this->createShop($contract1->id);
        }

        $contract2 = $this->createContract(overrideParams: ["name" => "{$searchWord}_name2"]);
        $contract2CustomerCount = 3;
        for ($i = 0; $i < $contract2CustomerCount; $i++) {
            $this->createCustomer($contract2->id);
        }

        $contract3 = $this->createContract(overrideParams: ["key" => "{$searchWord}_key3"]);

        $this->createContract(overrideParams: ["name" => "name4", "key" => "key4"]);

        //When
        $output = $this->useCase->execute(new FetchContractListInput($searchWord));

        //Then
        self::assertInstanceOf(FetchContractListOutput::class, $output);
        self::assertCount(3, $output->values, "検索ワードに一致する契約が3つ取得できること");

        $contract1Output = $output->values->firstWhere("id", $contract1->id);
        self::assertEqualsCanonicalizing(
            [
                "id" => $contract1->id,
                "accountName" => $contract1->name,
                "contractKey" => $contract1->key,
                "customerCount" => $contract1CustomerCount,
                "shopCount" => $contract1ShopCount,
                "personInCharge" => $contract1->person_in_charge,
                "tel" => $contract1->tel,
                "industry" => $contract1->industry,
                "contractStatus" => $contract1->contract_status->description(),
                "contractAppType" => $contract1->contract_app_type->description(),
            ],
            $contract1Output,
        );

        $contract2Output = $output->values->firstWhere("id", $contract2->id);
        self::assertEqualsCanonicalizing(
            [
                "id" => $contract2->id,
                "accountName" => $contract2->name,
                "contractKey" => $contract2->key,
                "customerCount" => $contract2CustomerCount,
                "shopCount" => 0,
                "personInCharge" => $contract2->person_in_charge,
                "tel" => $contract2->tel,
                "industry" => $contract2->industry,
                "contractStatus" => $contract2->contract_status->description(),
                "contractAppType" => $contract2->contract_app_type->description(),
            ],
            $contract2Output,
        );

        $contract3Output = $output->values->firstWhere("id", $contract3->id);
        self::assertEqualsCanonicalizing(
            [
                "id" => $contract3->id,
                "accountName" => $contract3->name,
                "contractKey" => $contract3->key,
                "customerCount" => 0,
                "shopCount" => 0,
                "personInCharge" => $contract3->person_in_charge,
                "tel" => $contract3->tel,
                "industry" => $contract3->industry,
                "contractStatus" => $contract3->contract_status->description(),
                "contractAppType" => $contract3->contract_app_type->description(),
            ],
            $contract3Output,
        );
    }
}
