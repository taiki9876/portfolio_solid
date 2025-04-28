<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\EditContractUseCase;

use App\Models\Contract\Rule\ContractFieldRule;
use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\Contract\ValueObjects\ContractStatusEnum;
use Illuminate\Support\Facades\Validator;

class EditContractInput
{
    public readonly string $contractName;
    public readonly string|null $personInCharge;
    public readonly string|null $tel;
    public readonly string|null $email;
    public readonly string|null $industry;
    public readonly string|null $memo;
    public readonly ContractStatusEnum $contractStatus;
    public readonly ContractAppTypeEnum $contractAppType;

    public function __construct(
        string|null $contractName,
        string|null $personInCharge,
        string|null $tel,
        string|null $email,
        string|null $industry,
        string|null $memo,
        string|null $contractStatus,
        string|null $contractAppType,
    ) {
        Validator::make(
            [
                "contractName" => $contractName,
                "personInCharge" => $personInCharge,
                "tel" => $tel,
                "email" => $email,
                "industry" => $industry,
                "memo" => $memo,
                "contractStatus" => $contractStatus,
                "contractAppType" => $contractAppType,
            ],
            ContractFieldRule::validationRules(["contractKey", "contractKeyAlias"]),
            ContractFieldRule::validationMessages(),
        )
            ->setAttributeNames(ContractFieldRule::validationAttribute())
            ->validate();

        $this->contractName = $contractName ?? "";
        $this->personInCharge = $personInCharge;
        $this->tel = $tel;
        $this->email = $email;
        $this->industry = $industry;
        $this->memo = $memo;
        $this->contractStatus = ContractStatusEnum::from((int) $contractStatus);
        $this->contractAppType = ContractAppTypeEnum::from((int) $contractAppType);
    }
}
