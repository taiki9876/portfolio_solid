<?php

declare(strict_types=1);

namespace Feature\Admin\Api\SystemAdmin;

use App\UseCase\SystemAdmin\DeleteManagementNoticeUseCase\DeleteManagementNoticeUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Symfony\Component\HttpFoundation\Response;
use Tests\Helper\AdminCreator;
use Tests\Helper\ManagementNoticeCreator;
use Tests\TestCase;

class SystemAdminManagementNoticeControllerTest extends TestCase
{
    use RefreshDatabase;
    use AdminCreator;
    use ManagementNoticeCreator;

    public function test_fetchManagementNotices_お知らせを取得できること(): void
    {
        //Given
        $systemAdmin = $this->createSystemAdmin();
        $this->actingAs($systemAdmin, "admin");

        //When
        $response = $this->get(route("admin.api.systemAdmin.fetchManagementNotices"));

        //Then
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_createManagementNotices_お知らせを作成できること(): void
    {
        //Given
        $systemAdmin = $this->createSystemAdmin();
        $this->actingAs($systemAdmin, "admin");

        //When
        $response = $this->post(route("admin.api.systemAdmin.createManagementNotice", [
            "title" => "TestTitle",
            "content" => "TestContent",
            "isPublished" => "1",
            "publishedAt" => "2025-01-01 12:00:00",
            "unpublishedAt" => null,
            "contractAppType" => null,
        ]));

        //Then
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_editManagementNotice_お知らせを編集できること(): void
    {
        //Given
        $notice = $this->createManagementNotice();

        $systemAdmin = $this->createSystemAdmin();
        $this->actingAs($systemAdmin, "admin");

        //When
        $response = $this->patch(
            route("admin.api.systemAdmin.editManagementNotice", ["notice_id" => $notice->id]),
            [
                "title" => "TestTitle",
                "content" => "TestContent",
                "isPublished" => "1",
                "showPopup" => "1",
                "publishedAt" => "2025-01-01 12:00:00",
                "unpublishedAt" => null,
                "contractAppType" => null,
            ]
        );

        //Then
        $response->assertStatus(Response::HTTP_OK);
    }

    public function test_deleteManagementNotices_リクエストが正常に実行されること(): void
    {
        //Given: アカウント作成
        $notice = $this->createManagementNotice();
        $admin = $this->createSystemAdmin();
        $this->actingAs($admin, "admin");

        $mock = Mockery::mock(DeleteManagementNoticeUseCase::class);
        /** @phpstan-ignore-next-line */
        $mock->shouldReceive("execute")->andReturn(true);

        //When
        $this->delete(
            route("admin.api.systemAdmin.deleteManagementNotice", ["notice_id" => $notice->id]),
        )->assertStatus(Response::HTTP_OK);
    }
}
