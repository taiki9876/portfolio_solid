<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\SystemAdmin\EditContractUseCase;

use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\Contract\ValueObjects\ContractStatusEnum;
use App\UseCase\SystemAdmin\EditContractUseCase\EditContractInput;
use App\UseCase\SystemAdmin\EditContractUseCase\EditContractUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\ContractCreator;
use Tests\Helper\Mock\FirebaseMock;
use Tests\TestCase;

class EditContractUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use FirebaseMock;

    public function test_execute_契約アカウントを編集できること(): void
    {
        //Given
        $contract = $this->createContract();
        $notChangedContract = $this->createContract();//変更されない想定の契約アカウント
        $params = [
            "contractName" => "契約アカウント名",
            "personInCharge" => "担当者名",
            "tel" => "090-1234-5678",
            "email" => null,
            "industry" => "業種",
            "memo" => "メモ",
            "contractStatus" => (string) ContractStatusEnum::INACTIVE->value,
            "contractAppType" => (string) ContractAppTypeEnum::NATIVE_APP->value,
        ];
        $input = new EditContractInput(...$params);

        // When
        $contact = resolve(EditContractUseCase::class)->execute($contract->id, $input);

        // Then
        self::assertDatabaseHas("contracts", [
            "id" => $contact->id,
            "name" => $params["contractName"],
            "key" => $contract->key,
            "key_alias" => $contract->key_alias,
            "person_in_charge" => $params["personInCharge"],
            "tel" => $params["tel"],
            "email" => $params["email"],
            "industry" => $params["industry"],
            "memo" => $params["memo"],

            "contract_status" => ContractStatusEnum::from((int) $params['contractStatus']),
        ]);

        self::assertDatabaseHas("contracts", [
            "id" => $notChangedContract->id,
            "name" => $notChangedContract->name,
            "key" => $notChangedContract->key,
            "key_alias" => $notChangedContract->key_alias,
            "person_in_charge" => $notChangedContract->person_in_charge,
            "tel" => $notChangedContract->tel,
            "email" => $notChangedContract->email,
            "industry" => $notChangedContract->industry,
            "memo" => $notChangedContract->memo,

            "contract_status" => $notChangedContract->contract_status,
        ]);
    }
}
