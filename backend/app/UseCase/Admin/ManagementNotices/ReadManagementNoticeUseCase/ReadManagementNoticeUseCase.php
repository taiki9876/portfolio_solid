<?php

declare(strict_types=1);

namespace App\UseCase\Admin\ManagementNotices\ReadManagementNoticeUseCase;

use App\Models\Admin\Admin;
use App\Models\ManagementNotice\NoticeRead;
use Illuminate\Support\Facades\DB;

class ReadManagementNoticeUseCase
{
    public function execute(Admin $admin, ReadManagementNoticeInput $input): bool
    {
        return $this->insertReadRecord($admin, $input->managementNoticeId);
    }

    private function insertReadRecord(Admin $admin, int $managementNoticeId): bool
    {
        return DB::table(NoticeRead::TABLE)
            ->insert([
                "management_notice_id" => $managementNoticeId,
                "admin_id" => $admin->id,
                "read_at" => now(),
            ]);
    }
}
