<?php

declare(strict_types=1);

namespace Tests\Helper;

use App\Models\Admin\Admin;
use App\Models\Admin\ValueObjects\AdminRoleEnum;

trait AdminCreator
{
    /**
     * @param array<string, mixed> $overrideParams
     *
     * @return Admin
     */
    public function createSystemAdmin(array $overrideParams = []): Admin
    {
        $params = array_merge(["contract_id" => null, "role" => AdminRoleEnum::SYSTEM_ADMIN], $overrideParams);
        return Admin::factory()->create($params);
    }

    /**
     * @param int                  $contractId
     * @param array<string, mixed> $overrideParams
     *
     * @return Admin
     */
    public function createSupportAdmin(int $contractId, array $overrideParams = []): Admin
    {
        $params = array_merge(["contract_id" => $contractId, "role" => AdminRoleEnum::SUPPORT_ADMIN], $overrideParams);
        return Admin::factory()->create($params);
    }

    /**
     * @param  int                  $contractId
     * @param  array<string, mixed> $overrideParams
     * @return Admin
     */
    public function createStoreAdmin(
        int $contractId,
        array $overrideParams = []
    ): Admin {
        $params = array_merge(["contract_id" => $contractId, "role" => AdminRoleEnum::STORE_OWNER], $overrideParams);
        return Admin::factory()->create($params);
    }
}
