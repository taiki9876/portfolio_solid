<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Auth\FetchProfileUseCase;

use App\Infrastructure\Repository\ContractEloquentRepository;
use App\Models\Admin\Admin;

class FetchProfileUseCase
{
    public function __construct(
        private readonly ContractEloquentRepository $contractRepository,
    ) {
    }

    public function execute(Admin $admin): FetchProfileOutput
    {
        if ($admin->isSystemAdmin()) {
            return new FetchProfileOutput(
                id: $admin->id,
                contractName: "",
                contractKey: "",
                role: $admin->role->toString(),
                firebaseLoginToken: "",
            );
        }

        $contract = $this->contractRepository->findById($admin->contract_id);

        if ($admin->isSupportAdmin()) {
            return new FetchProfileOutput(
                id: $admin->id,
                contractName: $contract->name,
                contractKey: $contract->key,
                role: $admin->role->toString(),
                firebaseLoginToken: "",
            );
        }

        return new FetchProfileOutput(
            id: $admin->id,
            contractName: $contract->name,
            contractKey: $contract->key,
            role: $admin->role->toString(),
            firebaseLoginToken: "",
        );
    }
}
