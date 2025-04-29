<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\SystemAdmin\CreateManagementNoticeUseCase;

use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\ManagementNotice\Rule\ManagementNoticeFieldRule as NoticeRule;
use App\UseCase\SystemAdmin\CreateManagementNoticeUseCase\CreateManagementNoticeInput;
use App\Util\DateUtil;
use Illuminate\Validation\ValidationException;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class CreateManagementNoticeInputTest extends TestCase
{
    /**
     * @return array<string, mixed>
     */
    private static function validRequest(): array
    {
        return [
            "title" => "タイトル",
            "content" => "adsf",
            'isPublished' => true,
            "showPopup" => true,
            'publishedAt' => '2025-01-01 12:00:00',
            'unpublishedAt' => '2025-03-01 14:00:00',
            'contractAppType' => (string) ContractAppTypeEnum::NATIVE_APP->value,
        ];
    }

    public function test_正常なリクエスト_プロパティに値がセットされていること(): void
    {
        $validRequest = self::validRequest();
        $input = new CreateManagementNoticeInput(...$validRequest);

        self::assertEquals($validRequest["title"], $input->title);
        self::assertEquals($validRequest["content"], $input->content);
        self::assertEquals($validRequest["isPublished"], $input->isPublished);
        self::assertEquals($validRequest["publishedAt"], $input->publishedAt->format(DateUtil::DATE_FORMAT));
        self::assertEquals($validRequest["unpublishedAt"], $input->unpublishedAt?->format(DateUtil::DATE_FORMAT));
        self::assertEquals($validRequest["contractAppType"], (string) $input->contractAppType?->value);
    }

    #[DataProvider("dataProvider_異常値")]
    public function test_validationエラーが発生すること(
        ?string $title,
        ?string $content,
        string|bool|null $isPublished,
        string|bool|null $showPopup,
        ?string $publishedAt,
        ?string $unpublishedAt,
        ?string $contractAppType,
        string $field
    ): void {
        try {
            new CreateManagementNoticeInput(
                $title,
                $content,
                $isPublished,
                $showPopup,
                $publishedAt,
                $unpublishedAt,
                $contractAppType,
            );
        } catch (ValidationException $exception) {
            self::assertArrayHasKey($field, $exception->errors());
            return;
        }

        self::fail('ValidationException が発生しませんでした');
    }

    /**
     * @return array<string, array<mixed>>
     */
    public static function dataProvider_異常値(): array
    {
        $validRequest = self::validRequest();
        return [
            "title_最大文字数オーバー" => [...$validRequest, "title" => str_repeat("a", NoticeRule::TITLE_MAX_LENGTH + 1), "field" => "title"],
            "content_最大文字数オーバー" => [...$validRequest, "content" => str_repeat("a", NoticeRule::CONTENT_MAX_LENGTH + 1), "field" => "content"],
            "publishedAt_無効な日付形式" => [...$validRequest, "publishedAt" => "11008993", "field" => "publishedAt"],
            "unpublishedAt_無効な日付形式" => [...$validRequest, "unpublishedAt" => "11008993", "field" => "unpublishedAt"],
            "unpublishedAt_掲載日以前を指定" => [...$validRequest, "unpublishedAt" => "2024-12-01 12:00:00", "field" => "unpublishedAt"],
//            "isPublished_無効な形式" => [...$validRequest, "isPublished" => "hoge", "field" => "isPublished"],不正値はfalseに強制変換しているため不要なテスト
            "contractAppType_無効な値" => [...$validRequest, "contractAppType" => "hoge", "field" => "contractAppType"],
            "contractAppType_無効な値2" => [...$validRequest, "contractAppType" => (string) (ContractAppTypeEnum::NATIVE_APP->value + 1), "field" => "contractAppType"],
        ];
    }
}
