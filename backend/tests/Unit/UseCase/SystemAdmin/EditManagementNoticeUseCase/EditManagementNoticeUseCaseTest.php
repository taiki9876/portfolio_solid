<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\SystemAdmin\EditManagementNoticeUseCase;

use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\ManagementNotice\ManagementNotice;
use App\UseCase\SystemAdmin\EditManagementNoticeUseCase\EditManagementNoticeInput;
use App\UseCase\SystemAdmin\EditManagementNoticeUseCase\EditManagementNoticeUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\ManagementNoticeCreator;
use Tests\TestCase;

class EditManagementNoticeUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ManagementNoticeCreator;

    public function test_execute_運営からのお知らせを編集できること(): void
    {
        // Given
        $notice = $this->createManagementNotice();
        self::assertDatabaseHas(ManagementNotice::TABLE, ["id" => $notice->id, "title" => $notice->title]);

        $params = [
            "title" => "TestTitle",
            "content" => "TestContent",
            "isPublished" => false,
            "showPopup" => true,
            "publishedAt" => "2022-01-01 00:00:00",
            "unpublishedAt" => "2022-01-02 00:00:00",
            "contractAppType" => (string) ContractAppTypeEnum::NATIVE_APP->value,
        ];
        $input = new EditManagementNoticeInput(...$params);

        // When
        $useCase = resolve(EditManagementNoticeUseCase::class);
        $output = $useCase->execute($notice->id, $input);

        // Then
        self::assertDatabaseHas(
            ManagementNotice::TABLE,
            [
                "id" => $notice->id,
                "title" => $params["title"],
                "content" => $params["content"],
                "is_published" => $params["isPublished"],
                "published_at" => $params["publishedAt"],
                "unpublished_at" => $params["unpublishedAt"],
                "contract_app_type" => $params["contractAppType"],
            ],
        );
    }
}
