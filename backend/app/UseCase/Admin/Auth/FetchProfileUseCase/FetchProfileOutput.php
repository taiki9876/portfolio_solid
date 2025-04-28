<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Auth\FetchProfileUseCase;

class FetchProfileOutput
{
    public function __construct(
        public int $id,
        public string $contractName,
        public string $contractKey,
        public string $role,
        public string $firebaseLoginToken,
    ) {
    }

    /**
     * @return array{
     *     id: int,
     *     contractName: string,
     *     contractKey: string,
     *     role: string,
     *     firebaseLoginToken: string,
     * }
     */
    public function toArray(): array
    {
        return [
            "id" => $this->id,
            "contractName" => $this->contractName,
            "contractKey" => $this->contractKey,
            "role" => $this->role,
            "firebaseLoginToken" => $this->firebaseLoginToken,
        ];
    }
}
