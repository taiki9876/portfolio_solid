<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\SystemAdmin\DeleteManagementNoticeUseCase;

use App\UseCase\SystemAdmin\DeleteManagementNoticeUseCase\DeleteManagementNoticeUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\ManagementNoticeCreator;
use Tests\TestCase;

class DeleteManagementNoticeUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ManagementNoticeCreator;

    public function test_execute_お知らせを削除できること(): void
    {
        // Given
        $notice = $this->createManagementNotice();
        // When
        $useCase = resolve(DeleteManagementNoticeUseCase::class);
        $actual = $useCase->execute($notice->id);

        // Then
        self::assertTrue($actual);
        self::assertDatabaseMissing('management_notices', ['id' => $notice->id]);
    }
}
