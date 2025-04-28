<?php

declare(strict_types=1);

namespace App\Models\Shared\Pagination;

readonly class PaginationMeta
{
    public int $lastPage;

    public function __construct(
        public int $total,
        public int $perPage,
        public int $page,
    ) {
        $this->lastPage = (int) ceil($total / $this->perPage);
    }

    /**
     * @return array{
     *     total: int,
     *     perPage: int,
     *     page: int,
     *     lastPage: int,
     * }
     */
    public function toArray(): array
    {
        return [
            'total' => $this->total,
            'perPage' => $this->perPage,
            'page' => $this->page,
            'lastPage' => $this->lastPage,
        ];
    }
}
