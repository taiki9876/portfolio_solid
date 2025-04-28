<?php

declare(strict_types=1);

namespace App\UseCase\Admin\ManagementNotices\FetchManagementNoticesUseCase;

use App\Models\Shared\Pagination\PerPageEnum;
use App\Models\Shared\Pagination\Rule\PaginationFieldRule;
use Illuminate\Support\Facades\Validator;

class FetchManagementNoticesInput
{
    public int $perPage;
    public int $page;

    public function __construct(
        ?string $perPage,
        ?string $page,
    ) {
        $params = [
            'perPage' => $perPage ?? PerPageEnum::PER_PAGE_20->value,
            'page' => $page ?? 1,
        ];
        Validator::make(
            $params,
            PaginationFieldRule::validationRules(),
        )
            ->validate();

        $this->perPage = (int) $params["perPage"];
        $this->page = (int) $params["page"];
    }
}
