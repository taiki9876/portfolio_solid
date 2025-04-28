<?php

declare(strict_types=1);

namespace Tests\Unit\Models\Admin\Services;

use App\Infrastructure\Firebase\FirebaseAuth;
use App\Models\Admin\Admin;
use App\Models\Admin\Services\AdminCreator;
use App\Models\Admin\ValueObjects\AdminRoleEnum;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Tests\Helper\AdminCreator as TestAdminCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\Mock\FirebaseMock;
use Tests\TestCase;

class AdminCreatorTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use TestAdminCreator;
    use FirebaseMock;

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_createAdmin_管理者アカウントを作成できること(): void
    {
        //Given
        $contract = $this->createContract();
        $newAdmin = Admin::create(
            $contract,
            'admin123',
            'password',
            AdminRoleEnum::STORE_OWNER,
        );

        $mock = Mockery::mock(FirebaseAuth::class);
        /** @phpstan-ignore-next-line */
        $mock->shouldReceive('createAuthUser')->once()->with($contract, $newAdmin)->andReturn($this->stabUserRecord());
        app()->instance(FirebaseAuth::class, $mock);

        resolve(AdminCreator::class)->createAdmin($contract, $newAdmin);

        $this->assertDatabaseHas('admins', [
            'login_id' => 'admin123',
            'role' => AdminRoleEnum::STORE_OWNER,
        ]);
    }

    public function test_createAdmin_システム管理者はFirebaseユーザを作成しないこと(): void
    {
        //Given
        $contract = $this->createContract();
        $newAdmin = Admin::create(
            $contract,
            'admin123',
            'password',
            AdminRoleEnum::SYSTEM_ADMIN,
        );

        $mock = Mockery::mock(FirebaseAuth::class);
        /** @phpstan-ignore-next-line */
        $mock->shouldReceive('createAuthUser')->times(0)->with($newAdmin)->andReturn($this->stabUserRecord());
        app()->instance(FirebaseAuth::class, $mock);

        resolve(AdminCreator::class)->createAdmin($contract, $newAdmin);

        $this->assertDatabaseHas('admins', [
            'login_id' => 'admin123',
            'role' => AdminRoleEnum::SYSTEM_ADMIN,
        ]);
    }
}
