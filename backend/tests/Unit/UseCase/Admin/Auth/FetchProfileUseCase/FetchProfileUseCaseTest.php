<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\Auth\FetchProfileUseCase;

use App\Infrastructure\Firebase\FirebaseAuth;
use App\UseCase\Admin\Auth\FetchProfileUseCase\FetchProfileUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\TestCase;

class FetchProfileUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use AdminCreator;

    private FetchProfileUseCase $useCase;

    public function setUp(): void
    {
        parent::setUp();
        $this->useCase = resolve(FetchProfileUseCase::class);
    }

    public function test_execute_ログイン中の管理者情報を取得できること_システム管理者(): void
    {
        //Given
        $contract = $this->createContract();
        $admin = $this->createSystemAdmin();

        // When
        $output = $this->useCase->execute($admin);

        // Then
        self::assertSame($admin->id, $output->id);
        self::assertSame("", $output->contractName);
        self::assertSame("", $output->contractKey);
        self::assertSame($admin->role->toString(), $output->role);
        self::assertSame("", $output->firebaseLoginToken);
    }

    public function test_execute_ログイン中の管理者情報を取得できること_サポート(): void
    {
        //Given
        $contract = $this->createContract();
        $admin = $this->createSupportAdmin($contract->id);

        // When
        $output = $this->useCase->execute($admin);

        // Then
        self::assertSame($admin->id, $output->id);
        self::assertSame($contract->name, $output->contractName);
        self::assertSame($contract->key, $output->contractKey);
        self::assertSame($admin->role->toString(), $output->role);
        self::assertSame("", $output->firebaseLoginToken);
    }

    public function test_execute_ログイン中の管理者情報を取得できること_店舗管理者(): void
    {
        //Given
        $mock = Mockery::mock(FirebaseAuth::class);
        /** @phpstan-ignore-next-line */
        $mock->shouldReceive('createFirebaseLoginToken')->once()->andReturn("firebaseLoginToken");
        app()->instance(FirebaseAuth::class, $mock);

        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);

        // When
        $output = resolve(FetchProfileUseCase::class)->execute($admin);

        // Then
        self::assertSame($admin->id, $output->id);
        self::assertSame($contract->name, $output->contractName);
        self::assertSame($contract->key, $output->contractKey);
        self::assertSame($admin->role->toString(), $output->role);
        self::assertSame("firebaseLoginToken", $output->firebaseLoginToken);
    }
}
