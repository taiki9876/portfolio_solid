<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\ChangeSupportAccount;

use App\Infrastructure\Repository\ContractEloquentRepository;
use App\Models\Admin\Admin;
use App\Models\Admin\ValueObjects\AdminRoleEnum;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class ChangeSupportAccountUseCase
{
    public function __construct(
        private readonly ContractEloquentRepository $contractRepository,
    ) {
    }

    /**
     * @param ChangeSupportAccountInput $input
     *
     * @return bool
     */
    public function execute(ChangeSupportAccountInput $input): bool
    {
        $contract = $this->contractRepository->findByKey($input->contractKey);

        $supportAdmin = $this->findSupportAccountByContractKey($contract->id);
        if ($supportAdmin === null) {
            return false;
        }

        Auth::guard("admin")->login($supportAdmin);
        Session::regenerate();
        return true;
    }

    /**
     * 契約アカウントキーからサポートアカウントを取得
     *
     * @param int $contractId
     *
     * @return Admin|null
     */
    private function findSupportAccountByContractKey(int $contractId): ?Admin
    {
        //本来はサポートログイン デモ用で店舗オーナー
        $targetRole = AdminRoleEnum::STORE_OWNER->value;
        //$targetRole = AdminRoleEnum::SUPPORT_ADMIN->value;

        return Admin::query()
            ->select('admins.*')
            ->where('contract_id', $contractId)
            ->where('role', $targetRole)
            ->first(); // 最初の1件を取得
    }
}
