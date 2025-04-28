<?php

declare(strict_types=1);

namespace Feature\Infrastructure\Repository;

use App\Infrastructure\Repository\AdminEloquentRepository;
use App\Models\Admin\Admin;
use App\Models\Admin\ValueObjects\AdminRoleEnum;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\TestCase;

class AdminEloquentRepositoryTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use AdminCreator;

    private AdminEloquentRepository $repository;

    public function setUp(): void
    {
        parent::setUp();
        $this->repository = new AdminEloquentRepository();
    }

    public function test_save_新規保存と更新ができること(): void
    {
        //Given
        $contract = $this->createContract();
        $props = $this->customerDummyProps();
        $admin = Admin::create($contract, ...$props);

        //When 新規保存
        unset($props["password"]);
        $this->repository->save($admin);//Then: 新規保存できること
        self::assertDatabaseHas("admins", [
            "id" => $admin->id,
            "contract_id" => $contract->id,
            ...$props
        ]);

        //When 更新
        $admin->login_id = "testchange";
        $this->repository->save($admin);//Then: 更新できること
        self::assertDatabaseHas("admins", [
            "id" => $admin->id,
            "contract_id" => $contract->id,
            ...$props,
            "login_id" => "testchange"
        ]);
    }

    public function test_findById_ID検索できること(): void
    {
        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);

        $actual = $this->repository->findById($admin->id);
        self::assertNotNull($actual);
        self::assertEquals($admin->id, $actual->id);
    }

    public function test_findByContractId_契約IDで取得できること(): void
    {
        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);

        $actual = $this->repository->findByContractId($contract->id);
        self::assertCount(1, $actual);
        self::assertEquals($admin->id, $actual->first()?->id);
    }

    /**
     * @return array<string, mixed>
     */
    private function customerDummyProps(): array
    {
        return [
            "login_id" => "loginId",
            "password" => "password",
            "role" => AdminRoleEnum::STORE_OWNER,
            "avatar_image_path" => null,
        ];
    }
}
