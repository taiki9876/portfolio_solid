<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Admin\Admin;
use App\Models\Admin\Services\AdminCreator;
use App\Models\Admin\ValueObjects\AdminRoleEnum;
use App\Models\Contract\Contract;
use App\Models\Customer\Customer;
use App\Models\Customer\Services\CustomerCreator;
use Illuminate\Database\Seeder;

class ContractSeeder extends Seeder
{
    public function run(): void
    {
        //テスト用の契約を作成
        $contract = Contract::factory()->create(["name" => "テストカフェ", "key" => "some-account", "key_alias" => "STEST"]);

        $adminCreator = resolve(AdminCreator::class);
        // サポート
        /** @var Admin $support */
        $support = Admin::factory()->create([
            "login_id" => 'support-admin',
            "contract_id" => $contract->id,
            "role" => AdminRoleEnum::SUPPORT_ADMIN
        ]);
        $adminCreator->createAdmin($contract, $support);

        // 店舗オーナー
        /** @var Admin $storeOwner */
        $storeOwner = Admin::factory()->create([
            "login_id" => 'store-owner',
            "contract_id" => $contract->id,
            "role" => AdminRoleEnum::STORE_OWNER
        ]);
        $adminCreator->createAdmin($contract, $storeOwner);

        //会員
        $customerCreator = resolve(CustomerCreator::class);
        for ($i = 0; $i < 13; $i++) {
            $newCustomer = Customer::factory()->create([
                "contract_id" => $contract->id,
            ]);
            $customerCreator->createCustomer($contract, $newCustomer);
        }
    }
}
