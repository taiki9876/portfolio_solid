<?php

declare(strict_types=1);

namespace Tests\Unit\Models\ManagementNotice;

use App\Models\ManagementNotice\ValueObjects\PublishingStatusEnum;
use Carbon\CarbonImmutable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\ManagementNoticeCreator;
use Tests\TestCase;

class ManagementNoticeTest extends TestCase
{
    use RefreshDatabase;
    use ManagementNoticeCreator;

    public function test_publishingStatus_掲載ステータスを取得できること(): void
    {
        $now = CarbonImmutable::now();
        $notice = $this->createManagementNotice(["is_published" => true]);

        // 掲載中
        $notice->published_at = $now->subDays();
        $notice->unpublished_at = $now->addMinute();
        self::assertEquals(PublishingStatusEnum::Published, $notice->publishingStatus());
        $notice->unpublished_at = null;
        self::assertEquals(PublishingStatusEnum::Published, $notice->publishingStatus());

        // 掲載終了
        $notice->unpublished_at = $now->subMinute();
        self::assertEquals(PublishingStatusEnum::EndOfPublication, $notice->publishingStatus());

        // 未掲載
        $notice->published_at = $now->addMinute();
        $notice->unpublished_at = null;
        self::assertEquals(PublishingStatusEnum::Unpublished, $notice->publishingStatus());

        // 非公開
        $notice->is_published = false;
        self::assertEquals(PublishingStatusEnum::Private, $notice->publishingStatus());
    }
}
