<?php

declare(strict_types=1);

namespace App\Models\Shared\Pagination;

enum PerPageEnum: int
{
    case PER_PAGE_10 = 10;
    case PER_PAGE_20 = 20;
    case PER_PAGE_50 = 50;
    case PER_PAGE_100 = 100;
}
