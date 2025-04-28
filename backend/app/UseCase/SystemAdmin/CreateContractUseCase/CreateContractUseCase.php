<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\CreateContractUseCase;

use App\Infrastructure\Repository\ContractEloquentRepository;
use App\Models\Admin\Admin;
use App\Models\Admin\Services\AdminCreator;
use App\Models\Admin\ValueObjects\AdminRoleEnum;
use App\Models\Contract\Contract;
use App\Models\Contract\ContractFactory;
use App\Models\Contract\ValueObjects\ContractStatusEnum;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class CreateContractUseCase
{
    public function __construct(
        private readonly ContractEloquentRepository $contractRepository,
        private readonly AdminCreator $adminCreator,
    ) {
    }

    /**
     * 契約アカウントの追加と、店舗様向けの管理者アカウントを作成する
     * @param  CreateContractInput $input
     * @return Contract
     * @throws Throwable
     */
    public function execute(CreateContractInput $input): Contract
    {
        try {
            return DB::transaction(function () use ($input) {
                $newContract = $this->createContract($input);
                $this->createOwnerAdmin($newContract, $input);
                $this->createSupportAdmin($newContract);
                return $newContract;
            });
        } catch (Throwable $e) {
            Log::error("契約作成に失敗しました: " . $e->getMessage(), ['exception' => $e]);
            throw $e;
        }
    }

    private function createContract(CreateContractInput $input): Contract
    {
        $contract = ContractFactory::init(
            $input->contractName,
            $input->contractKey,
            $input->contractKeyAlias,
            $input->contractAppTypeEnum,
            ContractStatusEnum::ACTIVE,
            $input->personInCharge,
            $input->tel,
            $input->email,
            $input->industry,
            $input->memo,
        );
        return $this->contractRepository->save($contract);
    }

    private function createOwnerAdmin(Contract $contract, CreateContractInput $input): void
    {
        $admin = Admin::create(
            $contract,
            $input->adminLoginId,
            $input->adminPassword,
            AdminRoleEnum::STORE_OWNER,
        );
        $this->adminCreator->createAdmin($contract, $admin);
    }

    private function createSupportAdmin(Contract $contract): void
    {
        $supportLoginId = "support-{$contract->id}";
        $admin = Admin::create(
            $contract,
            $supportLoginId,
            "password",// パスワードは適当。サポートはパスワードでのログインは不可のため
            AdminRoleEnum::SUPPORT_ADMIN,
        );
        $this->adminCreator->createAdmin($contract, $admin);
    }
}
