<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\Chat\FetchChatroomsUseCase;

use App\UseCase\Admin\Chat\FetchChatroomsUseCase\FetchChatroomsInput;
use Illuminate\Validation\ValidationException;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class FetchChatroomsInputTest extends TestCase
{
    // 正常なリクエスト値の例
    public const VALID_REQUEST = [
        "chatType" => "store",
        "filterStatus" => "all",
        "name" => "",
        "page" => "1",
        "contractKey" => "some-account",
    ];

    public function test_FetchChatrooms_正常なリクエスト_プロパティに値がセットされていること(): void
    {
        $input = new FetchChatroomsInput(...self::VALID_REQUEST);

        self::assertEquals(self::VALID_REQUEST["chatType"], $input->chatType->description());
        self::assertEquals(self::VALID_REQUEST["filterStatus"], $input->filterStatus->value);
    }

    #[DataProvider("dataProvider_異常値")]
    public function test_FetchChatrooms_validationエラーが発生すること(
        ?string $chatType,
        ?string $filterStatus,
        ?string $name,
        ?string $page,
        ?string $contractKey,
        string $field
    ): void {
        try {
            new FetchChatroomsInput(
                $chatType ?? "",
                $filterStatus ?? "",
                $name ?? "",
                $page ?? "1",
                $contractKey ?? ""
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
        $validRequest = self::VALID_REQUEST;
        return [
            "chatType_チャットタイプ指定が不正" => [...$validRequest, "chatType" => "sfgsdfv", "field" => "chatType"],
            "filterStatus_ステータス指定が不正" => [...$validRequest, "filterStatus" => "sfgsdfv", "field" => "filterStatus"],
            "name_最大文字超過" => [...$validRequest, "name" => str_repeat("あ", FetchChatroomsInput::NAME_MAX_LENGTH + 1), "field" => "name"],
            "page_不正文字" => [...$validRequest, "page" => "dgdg", "field" => "page"],
            "契約キー_不正文字" => [...$validRequest, "contractKey" => "", "field" => "contractKey"],
        ];
    }
}
