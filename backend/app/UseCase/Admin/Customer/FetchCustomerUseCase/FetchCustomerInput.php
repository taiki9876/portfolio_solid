<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Customer\FetchCustomerUseCase;

use App\Models\Shared\Pagination\PerPageEnum;
use App\Models\Shared\Pagination\Rule\PaginationFieldRule;
use Illuminate\Support\Facades\Validator;

readonly class FetchCustomerInput
{
    public int $perPage;
    public int $page;
    public ?string $sortBy;
    public ?string $sortOrder;
    public ?string $searchWord;

    public function __construct(
        ?string $perPage,
        ?string $page,
        ?string $sortBy,
        ?string $sortOrder,
        ?string $searchWord,
    ) {
        $params = [
            'perPage' => $perPage ?? PerPageEnum::PER_PAGE_20->value,
            'page' => $page ?? 1,
            'sortBy' => $sortBy,
            'sortOrder' => $sortOrder ?? "desc",
            'searchWord' => $searchWord,
        ];
        Validator::make(
            $params,
            PaginationFieldRule::validationRules(),
        )->validate();

        $this->perPage = (int) $params['perPage'];
        $this->page = (int) $params['page'];
        $this->sortBy = $params['sortBy'];
        $this->sortOrder = $params['sortOrder'];
        $this->searchWord = $params['searchWord'];
    }
}
