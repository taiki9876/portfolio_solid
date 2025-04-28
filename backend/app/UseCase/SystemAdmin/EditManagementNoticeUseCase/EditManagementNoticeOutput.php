<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\EditManagementNoticeUseCase;

readonly class EditManagementNoticeOutput
{
    public function __construct(
        public string $name,
    ) {
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            "name" => $this->name,
        ];
    }
}
