<?php

declare(strict_types=1);

namespace App\Models\Shared\Pagination\Rule;

use App\Models\Shared\Pagination\PerPageEnum;
use App\Models\Shared\Pagination\SortOrderEnum;
use Illuminate\Validation\Rule;

class PaginationFieldRule
{
    /**
     * @return array<string, mixed>
     */
    public static function validationRules(): array
    {
        return [
            'perPage' => [
                'required',
                'integer',
                'min:' . PerPageEnum::PER_PAGE_10->value,
                'max:' . PerPageEnum::PER_PAGE_100->value,
            ],
            'page' => [
                'required',
                'integer',
                'min:1',
            ],
            'sortBy' => [
                'nullable',
                'string',
                Rule::in(["last_visit_at", "last_name", "first_name_kana", "last_name_kana"])
            ],
            'sortOrder' => [
                'nullable',
                'string',
                Rule::in([SortOrderEnum::ASC->value, SortOrderEnum::DESC->value])
            ],
            'searchWord' => [
                'nullable',
                'string',
                'max:80',
            ],
        ];
    }
}
