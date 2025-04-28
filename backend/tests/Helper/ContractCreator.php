<?php

declare(strict_types=1);

namespace Tests\Helper;

use App\Models\Contract\Contract;
use App\Models\Contract\ValueObjects\ContractStatusEnum;

trait ContractCreator
{
    /**
     * @param ContractStatusEnum   $status
     * @param array<string, mixed> $overrideParams
     *
     * @return Contract
     */
    public function createContract(ContractStatusEnum $status = ContractStatusEnum::ACTIVE, array $overrideParams = []): Contract
    {
        $params = array_merge(
            [
                "contract_status" => $status,
                "deleted_at" => $status === ContractStatusEnum::INACTIVE ? now() : null,
            ],
            $overrideParams
        );

        return Contract::factory()->create($params);
    }
}
