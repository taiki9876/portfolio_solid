<?php

declare(strict_types=1);

namespace App\Models\Shared\Pagination;

enum SortOrderEnum: string
{
    case ASC = 'asc';
    case DESC = 'desc';
}
