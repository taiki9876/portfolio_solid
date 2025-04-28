<?php

declare(strict_types=1);

namespace App\Infrastructure\Repository;

use App\Models\Admin\Admin;
use App\Models\Admin\ValueObjects\AdminRoleEnum;
use Carbon\CarbonImmutable;
use Illuminate\Support\Collection;

class AdminEloquentRepository
{
    /**
     * @param  Admin $admin
     * @return Admin
     */
    public function save(Admin $admin): Admin
    {
        if ($admin->id === null) {
            $admin->save();
        } else {
            $admin->updated_at = CarbonImmutable::now();
            Admin::query()
                ->where('id', $admin->id)
                ->update($admin->toArray());
        }
        return $admin->refresh();
    }

    public function findById(int $id): ?Admin
    {
        return Admin::query()->where("id", $id)->first();
    }

    /**
     * @param  int                    $contractId
     * @return Collection<int, Admin>
     */
    public function findByContractId(int $contractId): Collection
    {
        return Admin::query()->where("contract_id", $contractId)->get();
    }

    /**
     * システム管理者アカウントを取得する
     * @return Admin
     */
    public function findSystemAdmin(): Admin
    {
        return Admin::query()->where("role", AdminRoleEnum::SYSTEM_ADMIN->value)->firstOrFail();
    }
}
