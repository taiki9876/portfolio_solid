<?php

declare(strict_types=1);

namespace Tests\Unit\Models\Customer\Services;

use App\Infrastructure\Firebase\FirebaseAuth;
use App\Models\Customer\Services\CustomerCreator;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator as TestCustomerCreator;
use Tests\Helper\Mock\FirebaseMock;
use Tests\TestCase;

class CustomerCreatorTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use TestCustomerCreator;
    use AdminCreator;
    use FirebaseMock;

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_createAdmin_会員アカウントを作成できること(): void
    {
        //Given
        $contract = $this->createContract();
        $customer = $this->createCustomer($contract->id);
        $admin = $this->createStoreAdmin($contract->id);
        $supportAdmin = $this->createSupportAdmin($contract->id);
        $systemAdmin = $this->createSystemAdmin();

        $mock = Mockery::mock(FirebaseAuth::class);
        /** @phpstan-ignore-next-line */
        $mock->shouldReceive('createAuthUser')->once()->with($contract, $customer)->andReturn($this->stabUserRecord());
        app()->instance(FirebaseAuth::class, $mock);

        //When
        resolve(CustomerCreator::class)->createCustomer($contract, $customer);

        //Then 会員データがあること、 firebase auth作成の実行(mockで検証)、チャットルーム作成済みであること
        $this->assertDatabaseHas('customers', ['id' => $customer->id]);
        $this->assertDatabaseHas('chatrooms', ['contract_key' => $contract->key]);
        $this->assertDatabaseHas('chatroom_members', ["admin_id" => $admin->id]);
        $this->assertDatabaseHas('chatroom_members', ["customer_id" => $customer->id]);

        //Then チャットをしないユーザとはチャットルームが作成されていないこと
        $this->assertDatabaseMissing('chatroom_members', ["customer_id" => $supportAdmin->id]);
        $this->assertDatabaseMissing('chatroom_members', ["customer_id" => $systemAdmin->id]);
    }
}
