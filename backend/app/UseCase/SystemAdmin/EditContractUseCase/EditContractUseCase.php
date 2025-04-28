<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\EditContractUseCase;

use App\Infrastructure\Repository\ContractEloquentRepository;
use App\Models\Contract\Contract;

class EditContractUseCase
{
    public function __construct(
        private readonly ContractEloquentRepository $contractEloquentRepository,
    ) {
    }

    public function execute(int $contractId, EditContractInput $input): Contract
    {
        $contract = $this->contractEloquentRepository->findById($contractId);
        $contract->edit(
            $input->contractName,
            $input->personInCharge,
            $input->tel,
            $input->email,
            $input->industry,
            $input->memo,
            $input->contractStatus,
            $input->contractAppType
        );

        return $this->contractEloquentRepository->save($contract);
    }
}
