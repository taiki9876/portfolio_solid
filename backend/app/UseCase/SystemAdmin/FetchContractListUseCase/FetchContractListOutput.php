<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\FetchContractListUseCase;

use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\Contract\ValueObjects\ContractStatusEnum;
use Illuminate\Support\Collection;
use stdClass;

class FetchContractListOutput
{
    /**
     * @var Collection<int, mixed>
     */
    public Collection $values;

    /**
     * @param Collection<int, stdClass> $contracts
     * @param array<string, int>        $shopCounts
     */
    public function __construct(
        Collection $contracts,
        array $shopCounts,
    ) {
        $this->values = $contracts->map(static function (stdClass $contract) use ($shopCounts) {
            return [
                "id" => $contract->id,
                "accountName" => $contract->account_name,
                "contractKey" => $contract->contract_key,
                "customerCount" => $contract->customer_count,
                "shopCount" => $shopCounts[$contract->id] ?? 0,
                "personInCharge" => $contract->person_in_charge,
                "tel" => $contract->tel,
                "industry" => $contract->industry,
                "contractStatus" => ContractStatusEnum::from($contract->contract_status)->description(),
                "contractAppType" => ContractAppTypeEnum::from($contract->contract_app_type)->description(),
            ];
        });
    }
}
