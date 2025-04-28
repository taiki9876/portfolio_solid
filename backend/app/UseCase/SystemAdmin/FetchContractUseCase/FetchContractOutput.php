<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\FetchContractUseCase;

readonly class FetchContractOutput
{
    public function __construct(
        public string $name,
        public string $key,
        public string $keyAlias,
        public string|null $industry,
        public string|null $personInCharge,
        public string|null $tel,
        public string|null $email,
        public string|null $memo,
        public int $contractStatus,
        public int $contractAppType,
        public int $customerCount,
        public int $shopCount,
        public string $adminLoginId,
    ) {
    }

    /**
     * @return array<string, mixed>
     */
    public function toContractInfo(): array
    {
        return [
            "name" => $this->name,
            "key" => $this->key,
            "keyAlias" => $this->keyAlias,
            "industry" => $this->industry,
            "personInCharge" => $this->personInCharge,
            "tel" => $this->tel,
            "email" => $this->email,
            "memo" => $this->memo,
            "contractStatus" => $this->contractStatus,
            "contractAppType" => $this->contractAppType,
            "customerCount" => $this->customerCount,
            "shopCount" => $this->shopCount,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function toOwnerAdminInfo(): array
    {
        return [
            "adminLoginId" => $this->adminLoginId,
            "password" => "********",
        ];
    }
}
