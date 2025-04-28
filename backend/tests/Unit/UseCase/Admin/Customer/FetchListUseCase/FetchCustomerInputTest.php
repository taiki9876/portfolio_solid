<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\Customer\FetchListUseCase;

use App\UseCase\Admin\Customer\FetchCustomerUseCase\FetchCustomerInput;
use Illuminate\Validation\ValidationException;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class FetchCustomerInputTest extends TestCase
{
    // 正常なリクエスト値の例
    public const VALID_REQUEST = [
        "perPage" => "10",
        "page" => "1",
        "sortBy" => null,
        "sortOrder" => null,
        "searchWord" => null
    ];

    public function test_正常なリクエスト_プロパティに値がセットされていること(): void
    {
        $input = new FetchCustomerInput(...self::VALID_REQUEST);

        self::assertEquals(self::VALID_REQUEST["perPage"], $input->perPage);
        self::assertEquals(self::VALID_REQUEST["page"], $input->page);
        self::assertEquals(self::VALID_REQUEST["sortBy"], $input->sortBy);
        self::assertEquals("desc", $input->sortOrder);
        self::assertEquals(self::VALID_REQUEST["searchWord"], $input->searchWord);
    }

    /**
     * @param  string|null $perPage
     * @param  string|null $page
     * @param  string|null $sortBy
     * @param  string|null $sortOrder
     * @param  string|null $searchWord
     * @param  string      $field
     * @return void
     */
    #[DataProvider("dataProvider_異常値")]
    public function test_validationエラーが発生すること(
        ?string $perPage,
        ?string $page,
        ?string $sortBy,
        ?string $sortOrder,
        ?string $searchWord,
        string $field
    ): void {
        try {
            new FetchCustomerInput(
                $perPage,
                $page,
                $sortBy,
                $sortOrder,
                $searchWord,
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
            "perPage_1ページのアイテム件数が少ない" => [...$validRequest, "perPage" => "9", "field" => "perPage"],
            "perPage_1ページのアイテム件数が多い" => [...$validRequest, "perPage" => "101", "field" => "perPage"],
            "perPage_数値でない" => [...$validRequest, "perPage" => "hoge", "field" => "perPage"],
            "page_数値でない" => [...$validRequest, "page" => "hoge", "field" => "page"],
            "page_異常な数値" => [...$validRequest, "page" => "-2", "field" => "page"],
            "sortBy_許可された文字列でない" => [...$validRequest, "sortBy" => "dgas", "field" => "sortBy"],
            "sortOrder_許可された文字列でない" => [...$validRequest, "sortOrder" => "dgas", "field" => "sortOrder"],
            "searchWord_文字数超過" => [...$validRequest, "searchWord" => str_repeat("a", 81), "field" => "searchWord"],
        ];
    }
}
