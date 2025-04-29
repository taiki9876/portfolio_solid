<?php

declare(strict_types=1);

namespace Tests\Helper;

use App\Models\Admin\Admin;
use App\Models\ManagementNotice\ManagementNotice;
use App\Models\ManagementNotice\NoticeRead;

trait NoticeReadsCreator
{
    /**
     * @param  ManagementNotice $notice
     * @param  Admin            $admin
     * @param  array<mixed>     $overrideParams
     * @return NoticeRead
     */
    public function createNoticeRead(
        ManagementNotice $notice,
        Admin $admin,
        array $overrideParams = []
    ): NoticeRead {
        $params = array_merge(
            $overrideParams,
            ['management_notice_id' => $notice->id, 'admin_id' => $admin->id]
        );

        return NoticeRead::factory()->create($params);
    }
}
