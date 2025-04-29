<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\ManagementNotice\FetchUnreadManagementNoticeUseCase;

use App\UseCase\Admin\ManagementNotices\FetchUnreadManagementNoticeUseCase\FetchUnreadManagementNoticeUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\ManagementNoticeCreator;
use Tests\Helper\NoticeReadsCreator;
use Tests\TestCase;

class FetchUnreadManagementNoticeUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use AdminCreator;
    use ManagementNoticeCreator;
    use NoticeReadsCreator;

    private FetchUnreadManagementNoticeUseCase $useCase;

    public function setUp(): void
    {
        parent::setUp();
        $this->useCase = resolve(FetchUnreadManagementNoticeUseCase::class);
    }

    public function test_execute_未読の運営からのお知らせを取得できること(): void
    {
        // Given 未読が複数ある場合最新の一件のみを取得できること
        $admin = $this->createStoreAdmin($this->createContract()->id);
        $notice1 = $this->createManagementNotice(["show_popup" => true, "published_at" => now()->subDays(1)]);
        $this->createManagementNotice(["show_popup" => true, "published_at" => now()->subDays(2)]);

        // When
        $unreadNotice = $this->useCase->execute($admin);

        // Then
        self::assertNotNull($unreadNotice);
        self::assertEquals($notice1->id, $unreadNotice->id);
    }

    public function test_execute_既読している場合はnullを取得すること(): void
    {
        // Given
        $admin = $this->createStoreAdmin($this->createContract()->id);
        $notice = $this->createManagementNotice(["show_popup" => true]);
        $this->createNoticeRead($notice, $admin);

        // When
        $unreadNotice = $this->useCase->execute($admin);

        // Then
        self::assertNull($unreadNotice);
    }

    public function test_execute_運営からのお知らせがない場合はnullを取得すること(): void
    {
        // Given
        $admin = $this->createStoreAdmin($this->createContract()->id);

        // When
        $unreadNotice = $this->useCase->execute($admin);

        // Then
        self::assertNull($unreadNotice);
    }
}
