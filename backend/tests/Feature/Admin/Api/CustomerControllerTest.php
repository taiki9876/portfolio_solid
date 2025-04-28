<?php

declare(strict_types=1);

namespace Feature\Admin\Api;

use App\UseCase\Admin\Customer\UpdateMemoUseCase\UpdateMemoUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Symfony\Component\HttpFoundation\Response;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\TestCase;

class CustomerControllerTest extends TestCase
{
    use RefreshDatabase;
    use AdminCreator;
    use ContractCreator;

    public function test_updateMemo_リクエストが正常に実行されること(): void
    {
        //Given: アカウント作成
        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);

        $this->actingAs($admin, "admin");

        $useCaseMock = Mockery::mock(UpdateMemoUseCase::class);
        $useCaseMock->shouldReceive("execute")->once();//@phpstan-ignore-line
        app()->instance(UpdateMemoUseCase::class, $useCaseMock);

        //When
        $this->patch(
            route("admin.api.customers.updateMemo", ["customer_id" => 1, "memo" => "memo"])
        )->assertStatus(Response::HTTP_NO_CONTENT);
    }
}
