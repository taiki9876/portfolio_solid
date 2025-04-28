<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Home\FetchAggregationSummaryUseCase;

use App\Infrastructure\Query\PublishManagementNoticeQuery;
use App\Infrastructure\Repository\ContractEloquentRepository;
use App\Models\Admin\Admin;
use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\ManagementNotice\ManagementNotice;
use Illuminate\Support\Collection;

class FetchAggregationSummaryUseCase
{
    public const NOTICE_LIMIT = 7;

    public function __construct(
        private readonly ContractEloquentRepository $contractRepository,
        private readonly PublishManagementNoticeQuery $publishManagementNoticeQuery,
    ) {
    }

    public function execute(Admin $admin): FetchAggregationSummaryOutput
    {
        $contract = $this->contractRepository->findById($admin->contract_id);

        return new FetchAggregationSummaryOutput(
            $this->latestPublishedManagementNotices($contract->contract_app_type)
        );
    }

    /**
     * @param  ContractAppTypeEnum               $contractAppType
     * @return Collection<int, ManagementNotice>
     */
    private function latestPublishedManagementNotices(ContractAppTypeEnum $contractAppType): Collection
    {
        return $this->publishManagementNoticeQuery->search($contractAppType, limit: self::NOTICE_LIMIT);
    }
}
