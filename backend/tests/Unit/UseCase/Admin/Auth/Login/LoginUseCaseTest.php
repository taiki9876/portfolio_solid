<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\Auth\Login;

use App\Models\Contract\ValueObjects\ContractStatusEnum;
use App\UseCase\Admin\Auth\Login\AdminLoginInput;
use App\UseCase\Admin\Auth\Login\AdminLoginUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\TestCase;

class LoginUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use AdminCreator;

    private AdminLoginUseCase $useCase;

    public function setUp(): void
    {
        parent::setUp();
        $this->useCase = resolve(AdminLoginUseCase::class);
    }

    public function test_execute_ログインできること(): void
    {
        $contract = $this->createContract();

        // Given ストアオーナー
        $password = "password";

        $admin = $this->createStoreAdmin($contract->id,  ["login_id" => "store-owner", "password" => bcrypt($password)]);
        $input = new AdminLoginInput("store-owner", $password);

        // When
        $result = $this->useCase->execute($input);

        //Then
        self::assertTrue($result);
        $this->assertAuthenticatedAs($admin, "admin");

        // Given システム管理者
        $admin = $this->createSystemAdmin(["login_id" => "systemAdmin", "password" => bcrypt($password)]);
        $input = new AdminLoginInput("systemAdmin", $password);

        // When
        $result = $this->useCase->execute($input);

        //Then
        self::assertTrue($result);
        $this->assertAuthenticatedAs($admin, "admin");

    }

    public function test_execute_サポートはログインできないこと(): void
    {
        // Given
        $contract = $this->createContract();

        $this->createSupportAdmin($contract->id,  ["login_id" => "support", "password" => bcrypt("password")]);
        $input = new AdminLoginInput("support", "password");

        // When
        $result = $this->useCase->execute($input);
        //Then
        $this->assertGuest("admin");
        self::assertNotTrue($result);
        self::assertEquals(AdminLoginUseCase::SUPPORT_NOT_LOGIN_MESSAGE, $result);
    }

    public function test_execute_無効な契約アカウントはログインできないこと(): void
    {
        // Given
        $contract = $this->createContract(status: ContractStatusEnum::INACTIVE);

        $this->createStoreAdmin($contract->id,  ["login_id" => "store-owner", "password" => bcrypt("password")]);
        $input = new AdminLoginInput("store-owner", "password");

        // When
        $result = $this->useCase->execute($input);
        //Then
        $this->assertGuest("admin");
        self::assertNotTrue($result);
        self::assertEquals(AdminLoginUseCase::CONTRACT_INACTIVE_MESSAGE, $result);
    }
}
