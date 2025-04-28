<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\FetchChatCustomerUseCase;

readonly class FetchChatCustomerOutput
{
    public function __construct(
        public int $customerId,
        public string $customerCode,
        public string $customerName,
        public string|null $avatarImageUrl,
        public string $rank,
        public string|null $birthday,
        public int|null $age,
        public string $gender,
        public string|null $entryAt,
        public string|null $lastVisitAt,
        public string|null $memo,
    ) {
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return get_object_vars($this);
    }
}
