<?php

declare(strict_types=1);

namespace Feature\Admin\Api;

use App\Models\Shared\Pagination\PaginationMeta;
use App\UseCase\Admin\ManagementNotices\FetchManagementNoticesUseCase\FetchManagementNoticesOutput;
use App\UseCase\Admin\ManagementNotices\FetchManagementNoticesUseCase\FetchManagementNoticesUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Symfony\Component\HttpFoundation\Response;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\TestCase;

class ManagementNoticeControllerTest extends TestCase
{
    use RefreshDatabase;
    use AdminCreator;
    use ContractCreator;

    public function test_fetchManagementNotices_リクエストが正常に実行されること(): void
    {
        //Given: アカウント作成
        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);
        $this->actingAs($admin, "admin");

        $mock = Mockery::mock(FetchManagementNoticesUseCase::class);
        /** @phpstan-ignore-next-line */
        $mock->shouldReceive("execute")
            ->andReturn(new FetchManagementNoticesOutput(collect(), new PaginationMeta(0, 20, 1)));

        //When
        $this->get(
            route("admin.api.managementNotice.fetchManagementNotices"),
            ["per_page" => 20, "page" => 1]
        )->assertStatus(Response::HTTP_OK);
    }
}
