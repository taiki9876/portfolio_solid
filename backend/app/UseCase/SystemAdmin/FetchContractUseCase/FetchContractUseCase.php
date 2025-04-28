<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\FetchContractUseCase;

use App\Models\Admin\Admin;
use App\Models\Admin\ValueObjects\AdminRoleEnum;
use App\Models\Contract\Contract;
use App\Models\Shop\Shop;
use Illuminate\Support\Facades\DB;
use stdClass;

class FetchContractUseCase
{
    public function execute(int $contractId): FetchContractOutput
    {
        $contract = $this->contractQuery($contractId);
        if ($contract === null) {
            throw new \DomainException("指定する契約は存在しません。");
        }
        $ownerAdmin = $this->ownerAdminQuery($contractId);
        if ($ownerAdmin === null) {
            throw new \DomainException("オーナー管理者が存在しません。不正なデータです。");
        }

        return new FetchContractOutput(
            $contract->name,
            $contract->key,
            $contract->key_alias,
            $contract->industry,
            $contract->person_in_charge,
            $contract->tel,
            $contract->email,
            $contract->memo,
            $contract->contract_status,
            $contract->contract_app_type,

            $contract->customer_count,
            $contract->shop_count,
            $ownerAdmin->login_id,
        );
    }

    private function contractQuery(int $contractId): stdClass|null
    {
        $result = DB::table(Contract::TABLE)
            ->select([
                'contracts.*',
                DB::raw('count(c.id) as customer_count'),
            ])
            ->leftJoin('customers as c', 'contracts.id', '=', 'c.contract_id')
            ->where('contracts.id', $contractId)
            ->groupBy('contracts.id')
            ->limit(1)
            ->get();

        if ($result->isEmpty()) {
            return null;
        }
        $shopCount = DB::table(Shop::TABLE)->where("contract_id", $contractId)->count();

        $contractSummary = $result->first();
        $contractSummary->shop_count = $shopCount;
        return $contractSummary;
    }

    private function ownerAdminQuery(int $contractId): stdClass|null
    {
        $result = DB::table(Admin::TABLE)
            ->select("login_id")
            ->where("contract_id", $contractId)
            ->where("role", AdminRoleEnum::STORE_OWNER)
            ->limit(1)
            ->get();

        return $result->first();
    }
}
