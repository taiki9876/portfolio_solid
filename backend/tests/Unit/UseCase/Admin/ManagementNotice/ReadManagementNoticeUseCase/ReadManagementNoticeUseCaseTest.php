<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\ManagementNotice\ReadManagementNoticeUseCase;

use App\Models\ManagementNotice\NoticeRead;
use App\UseCase\Admin\ManagementNotices\ReadManagementNoticeUseCase\ReadManagementNoticeInput;
use App\UseCase\Admin\ManagementNotices\ReadManagementNoticeUseCase\ReadManagementNoticeUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\ManagementNoticeCreator;
use Tests\TestCase;

class ReadManagementNoticeUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use AdminCreator;
    use ManagementNoticeCreator;

    public function test_execute_既読のレコードが追加されること(): void
    {
        // Given
        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);
        $notice = $this->createPublishedManagementNotice();

        $input = new ReadManagementNoticeInput((string)$notice->id);

        // When
        $useCase = resolve(ReadManagementNoticeUseCase::class);
        $output = $useCase->execute($admin, $input);

        // Then
        self::assertTrue($output);
        self::assertDatabaseHas(NoticeRead::TABLE, [
            "admin_id" => $admin->id,
            "management_notice_id" => $notice->id,
            "read_at" => now(),
        ]);
    }
}
