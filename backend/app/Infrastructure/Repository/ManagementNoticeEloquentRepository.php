<?php

declare(strict_types=1);

namespace App\Infrastructure\Repository;

use App\Models\ManagementNotice\ManagementNotice;
use Carbon\CarbonImmutable;

class ManagementNoticeEloquentRepository
{
    public function save(ManagementNotice $notice): ManagementNotice
    {
        if ($notice->id === null) {
            $notice->save();
        } else {
            $notice->updated_at = CarbonImmutable::now();
            ManagementNotice::query()
                ->where('id', $notice->id)
                ->update($notice->toArray());
        }
        return $notice->refresh();
    }

    public function findById(int $id): ManagementNotice
    {
        return ManagementNotice::query()->where("id", $id)->firstOrFail();
    }

    public function removeBy(ManagementNotice|int $notice): bool
    {
        $noticeId = $notice instanceof ManagementNotice ? $notice->id : $notice;
        $result = ManagementNotice::query()->where("id", $noticeId)->delete();

        return $result > 0;
    }
}
