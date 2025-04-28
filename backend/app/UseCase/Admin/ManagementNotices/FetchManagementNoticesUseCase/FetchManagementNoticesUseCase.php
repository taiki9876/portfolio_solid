<?php

declare(strict_types=1);

namespace App\UseCase\Admin\ManagementNotices\FetchManagementNoticesUseCase;

use App\Infrastructure\Query\PublishManagementNoticeQuery;
use App\Infrastructure\Repository\ContractEloquentRepository;
use App\Models\Admin\Admin;
use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\ManagementNotice\ManagementNotice;
use App\Models\Shared\Pagination\PaginationMeta;
use Illuminate\Pagination\LengthAwarePaginator;

class FetchManagementNoticesUseCase
{
    public function __construct(
        private readonly ContractEloquentRepository $contractEloquentRepository,
        private readonly PublishManagementNoticeQuery $publishManagementNoticeQuery
    ) {
    }

    public function execute(FetchManagementNoticesInput $input, Admin $admin): FetchManagementNoticesOutput
    {
        $contract = $this->contractEloquentRepository->findById($admin->contract_id);
        return $this->query($input, $contract->contract_app_type);
    }

    private function query(FetchManagementNoticesInput $input, ContractAppTypeEnum $contractAppType): FetchManagementNoticesOutput
    {
        /** @var LengthAwarePaginator<ManagementNotice> $notices */
        $notices = $this->publishManagementNoticeQuery
            ->searchPaginate($contractAppType, $input->perPage, $input->page);

        return new FetchManagementNoticesOutput(
            $notices->collect(),
            new PaginationMeta(
                total: $notices->total(),
                perPage: $notices->perPage(),
                page: $notices->currentPage(),
            )
        );
    }
}
