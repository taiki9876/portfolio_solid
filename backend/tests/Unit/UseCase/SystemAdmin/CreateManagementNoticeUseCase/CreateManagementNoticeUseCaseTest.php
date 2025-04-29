<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\SystemAdmin\CreateManagementNoticeUseCase;

use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\ManagementNotice\ManagementNotice;
use App\UseCase\SystemAdmin\CreateManagementNoticeUseCase\CreateManagementNoticeInput;
use App\UseCase\SystemAdmin\CreateManagementNoticeUseCase\CreateManagementNoticeUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CreateManagementNoticeUseCaseTest extends TestCase
{
    use RefreshDatabase;

    public function test_execute_運営からのお知らせを作成できること(): void
    {
        // Given
        $params = [
            'title' => 'TestShop',
            'content' => 'TestContent',
            'isPublished' => false,
            'showPopup' => true,
            'publishedAt' => '2025-01-01 12:00:00',
            'unpublishedAt' => '2025-03-01 14:00:00',
            'contractAppType' => (string) ContractAppTypeEnum::NATIVE_APP->value,
        ];
        $input = new CreateManagementNoticeInput(...$params);

        // When
        $useCase = resolve(CreateManagementNoticeUseCase::class);
        $output = $useCase->execute($input);

        // Then
        self::assertInstanceOf(ManagementNotice::class, $output);
        self::assertDatabaseHas(ManagementNotice::TABLE, [
            'title' => $params['title'],
            'content' => $params['content'],
            'is_published' => $params['isPublished'],
            'show_popup' => $params['showPopup'],
            'published_at' => $params['publishedAt'],
            'unpublished_at' => $params['unpublishedAt'],
            'contract_app_type' => $params['contractAppType'],
        ]);
    }
}
