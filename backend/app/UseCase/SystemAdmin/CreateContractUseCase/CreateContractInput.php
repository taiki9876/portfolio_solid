<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\CreateContractUseCase;

use App\Models\Admin\Rule\AdminFieldRule as AdminRule;
use App\Models\Contract\Rule\ContractFieldRule;
use App\Models\Contract\Rule\ContractFieldRule as ContractRule;
use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use Illuminate\Support\Facades\Validator;

class CreateContractInput
{
    public readonly string $contractName;
    public readonly string $contractKey;
    public readonly string $contractKeyAlias;
    public readonly ContractAppTypeEnum $contractAppTypeEnum;
    public readonly string|null $personInCharge;
    public readonly string|null $tel;
    public readonly string|null $email;
    public readonly string|null $industry;
    public readonly string|null $memo;
    public readonly string $adminLoginId;
    public readonly string $adminPassword;

    public function __construct(
        string|null $contractName,
        string|null $contractKey,
        string|null $contractKeyAlias,
        string|null $contractAppType,
        string|null $personInCharge,
        string|null $tel,
        string|null $email,
        string|null $industry,
        string|null $memo,

        string|null $adminLoginId,
        string|null $adminPassword,
    ) {
        Validator::make(
            [
                "contractName" => $contractName,
                "contractKey" => $contractKey,
                "contractKeyAlias" => $contractKeyAlias,
                "contractAppType" => $contractAppType,
                "personInCharge" => $personInCharge,
                "tel" => $tel,
                "email" => $email,
                "industry" => $industry,
                "memo" => $memo,

                "adminLoginId" => $adminLoginId,
                "adminPassword" => $adminPassword,
            ],
            $this->rules(),
            ContractFieldRule::validationMessages(),
        )
            ->setAttributeNames($this->attributes())
            ->validate();

        $this->contractName = $contractName ?? "";
        $this->contractKey = $contractKey ?? "";
        $this->contractKeyAlias = $contractKeyAlias ?? "";
        $this->contractAppTypeEnum = ContractAppTypeEnum::from((int) $contractAppType);
        $this->personInCharge = $personInCharge;
        $this->tel = $tel;
        $this->email = $email;
        $this->industry = $industry;
        $this->memo = $memo;

        $this->adminLoginId = $adminLoginId ?? "";
        $this->adminPassword = $adminPassword ?? "";
    }

    /**
     * @return array<string, mixed>
     */
    private function rules(): array
    {
        return [
            ...ContractRule::validationRules(["contractStatus"]),
            ...AdminRule::validationRules(),
        ];
    }

    /**
     * @return string[]
     */
    private function attributes(): array
    {
        return [
            ...ContractRule::validationAttribute(),
            ...AdminRule::validationAttribute(),
        ];
    }
}
