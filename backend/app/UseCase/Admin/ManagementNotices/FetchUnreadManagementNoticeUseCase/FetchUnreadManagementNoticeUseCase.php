<?php

declare(strict_types=1);

namespace App\UseCase\Admin\ManagementNotices\FetchUnreadManagementNoticeUseCase;

use App\Infrastructure\Query\PublishManagementNoticeQuery;
use App\Infrastructure\Repository\ContractEloquentRepository;
use App\Models\Admin\Admin;
use App\Models\Contract\Contract;
use App\Models\ManagementNotice\ManagementNotice;
use App\Models\ManagementNotice\NoticeRead;
use Illuminate\Support\Facades\DB;

class FetchUnreadManagementNoticeUseCase
{
    public function __construct(
        private readonly PublishManagementNoticeQuery $publishManagementNoticeQuery,
        private readonly ContractEloquentRepository $contractRepository,
    ) {
    }

    public function execute(Admin $admin): FetchUnreadManagementNoticeOutput
    {
        $contract = $this->contractRepository->findById($admin->contract_id);
        $result = $this->query($contract, $admin);

        return new FetchUnreadManagementNoticeOutput($result);
    }

    private function query(Contract $contract, Admin $admin): ?ManagementNotice
    {
        $mainTable = ManagementNotice::TABLE;
        $managementNotice = $this->publishManagementNoticeQuery
            ->query($contract->contract_app_type, limit: 1)
            ->where("{$mainTable}.show_popup", true)
            ->orderByDesc("{$mainTable}.published_at")
            ->get()
            ->first();

        if ($managementNotice === null) {
            return null;
        }

        $isRead = DB::table(NoticeRead::TABLE)
            ->where("management_notice_id", $managementNotice->id)
            ->where("admin_id", $admin->id)
            ->exists();
        if ($isRead === true) {
            return null;
        }

        return $managementNotice;
    }
}
