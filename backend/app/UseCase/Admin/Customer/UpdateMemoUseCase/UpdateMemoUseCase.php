<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Customer\UpdateMemoUseCase;

use App\Infrastructure\Repository\CustomerEloquentRepository;
use DomainException;

class UpdateMemoUseCase
{
    public function __construct(
        private readonly CustomerEloquentRepository $customerRepository
    ) {
    }

    public function execute(UpdateMemoInput $input): bool
    {
        $customer = $this->customerRepository->findById($input->customerId);
        if ($customer === null) {
            throw new DomainException('会員が見つかりませんでした。');
        }

        $customer->setMemo($input->memo);
        $this->customerRepository->save($customer);

        return true;
    }
}
