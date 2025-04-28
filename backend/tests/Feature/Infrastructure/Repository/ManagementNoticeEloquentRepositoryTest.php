<?php

declare(strict_types=1);

namespace Feature\Infrastructure\Repository;

use App\Infrastructure\Repository\ManagementNoticeEloquentRepository;
use App\Models\ManagementNotice\ManagementNotice;
use Carbon\CarbonImmutable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\ContractCreator;
use Tests\Helper\ManagementNoticeCreator;
use Tests\TestCase;

class ManagementNoticeEloquentRepositoryTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use ManagementNoticeCreator;

    private ManagementNoticeEloquentRepository $repository;

    public function setUp(): void
    {
        parent::setUp();
        $this->repository = resolve(ManagementNoticeEloquentRepository::class);
    }

    public function test_save_新規保存と更新ができること(): void
    {
        //Given
        $props = $this->noticeDummyProps();
        $notice = ManagementNotice::create(...$props);

        //When 新規保存
        $this->repository->save($notice);//Then: 新規保存できること
        self::assertDatabaseHas(ManagementNotice::TABLE, [
            "id" => $notice->id,
            ...$props
        ]);

        //When 更新
        $notice->title = "変更";
        $this->repository->save($notice);//Then: 更新できること
        self::assertDatabaseHas(ManagementNotice::TABLE, [
            "id" => $notice->id,
            ...$props,
            "title" => "変更",
        ]);
    }

    public function test_findById_ID検索できること(): void
    {
        $title = "〇〇のお知らせ";
        $notice = $this->createManagementNotice(["title" => $title]);

        $actual = $this->repository->findById($notice->id);
        self::assertEquals($notice->id, $actual->id);
        self::assertEquals($notice->title, $actual->title);
    }

    /**
     * @return array<string, mixed>
     */
    private function noticeDummyProps(): array
    {
        return [
            "title" => "リリースのお知らせ",
            "content" => "リリースのお知らせです。今回は以下の機能が実装されました。",
            "is_published" => true,
            "published_at" => CarbonImmutable::now(),
            "unpublished_at" => null,
        ];
    }

    public function test_removeBy_お知らせを削除できること(): void
    {
        // Given
        $target = $this->createManagementNotice();
        $otherNotice = $this->createManagementNotice();

        //When
        $actual = $this->repository->removeBy($target);

        // THen
        self::assertDatabaseMissing(ManagementNotice::TABLE, ["id" => $target->id]);
        self::assertDatabaseHas(ManagementNotice::TABLE, ["id" => $otherNotice->id]);
    }
}
