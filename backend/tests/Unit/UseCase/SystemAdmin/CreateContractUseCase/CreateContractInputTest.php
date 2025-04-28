<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\SystemAdmin\CreateContractUseCase;

use App\Models\Admin\Rule\AdminFieldRule as AdminRule;
use App\Models\Contract\Rule\ContractFieldRule as ContractRule;
use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\UseCase\SystemAdmin\CreateContractUseCase\CreateContractInput;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Validation\ValidationException;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\TestCase;

class CreateContractInputTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use AdminCreator;

    public const REFRESH_TESTS = [
        "test_validationエラーが発生すること_重複するキーがある場合",
        "test_validationエラーが発生すること_重複する管理者ログインIDがある場合"
    ];

    public function setUp(): void
    {
        parent::setUp();
        if (in_array($this->name(), self::REFRESH_TESTS, true)) {
            $this->refreshDatabase();
        }
    }

    /**
     * @return array<string, string|null>
     */
    private static function validRequest(): array
    {
        return [
            "contractName" => "契約アカウント名",
            "contractKey" => "adsf",
            "contractKeyAlias" => "alias",
            "contractAppType" => (string) ContractAppTypeEnum::NATIVE_APP->value,
            "personInCharge" => "担当者名",
            "tel" => "090-1234-5678",
            "email" => null,
            "industry" => "業種",
            "memo" => "メモ",

            "adminLoginId" => "admin_login_id",
            "adminPassword" => "password",
        ];
    }

    public function test_正常なリクエスト_プロパティに値がセットされていること(): void
    {
        $validRequest = self::validRequest();
        $input = new CreateContractInput(...$validRequest);

        self::assertEquals($validRequest["contractName"], $input->contractName);
        self::assertEquals($validRequest["contractKey"], $input->contractKey);
        self::assertEquals($validRequest["contractKeyAlias"], $input->contractKeyAlias);
        self::assertEquals($validRequest["contractAppType"], $input->contractAppTypeEnum->value);
        self::assertEquals($validRequest["personInCharge"], $input->personInCharge);
        self::assertEquals($validRequest["tel"], $input->tel);
        self::assertEquals($validRequest["email"], $input->email);
        self::assertEquals($validRequest["industry"], $input->industry);
        self::assertEquals($validRequest["memo"], $input->memo);
        self::assertEquals($validRequest["adminLoginId"], $input->adminLoginId);
        self::assertEquals($validRequest["adminPassword"], $input->adminPassword);
    }

    #[DataProvider("dataProvider_異常値")]
    public function test_validationエラーが発生すること(
        ?string $contractName,
        ?string $contractKey,
        ?string $contractKeyAlias,
        ?string $contractAppType,
        ?string $personInCharge,
        ?string $tel,
        ?string $email,
        ?string $industry,
        ?string $memo,
        ?string $adminLoginId,
        ?string $adminPassword,
        string $field
    ): void {
        try {
            new CreateContractInput(
                $contractName,
                $contractKey,
                $contractKeyAlias,
                $contractAppType,
                $personInCharge,
                $tel,
                $email,
                $industry,
                $memo,
                $adminLoginId,
                $adminPassword,
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
            "contractName_最大文字数オーバー" => [...$validRequest, "contractName" => str_repeat("a", ContractRule::NAME_MAX_LENGTH + 1), "field" => "contractName"],
            "contractKey_最大文字数オーバー" => [...$validRequest, "contractKey" => str_repeat("a", ContractRule::KEY_MAX_LENGTH + 1), "field" => "contractKey"],
            "contractKey_文字列が不正" => [...$validRequest, "contractKey" => "アウルヘア", "field" => "contractKey"],
            "contractKeyAlias_最大文字数オーバー" => [...$validRequest, "contractKeyAlias" => str_repeat("a", ContractRule::KEY_ALIAS_MAX_LENGTH + 1), "field" => "contractKeyAlias"],
            "contractKeyAlias_文字列が不正" => [...$validRequest, "contractKeyAlias" => "aaあ", "field" => "contractKeyAlias"],
            "contractAppType_値が不正" => [...$validRequest, "contractAppType" => "124", "field" => "contractAppType"],
            "personInCharge_最大文字数オーバー" => [...$validRequest, "personInCharge" => str_repeat("a", ContractRule::PERSON_IN_CHARGE_MAX_LENGTH + 1), "field" => "personInCharge"],
            "tel_最大文字数オーバー" => [...$validRequest, "tel" => str_repeat("a", ContractRule::TEL_MAX_LENGTH + 1), "field" => "tel"],
            "email_最大文字数オーバー" => [...$validRequest, "email" => str_repeat("a", ContractRule::EMAIL_MAX_LENGTH + 1), "field" => "email"],
            "industry_最大文字数オーバー" => [...$validRequest, "industry" => str_repeat("a", ContractRule::INDUSTRY_MAX_LENGTH + 1), "field" => "industry"],
            "memo_最大文字数オーバー" => [...$validRequest, "memo" => str_repeat("a", ContractRule::MEMO_MAX_LENGTH + 1), "field" => "memo"],
            "adminLoginId_最大文字数オーバー" => [...$validRequest, "adminLoginId" => str_repeat("a", AdminRule::LOGIN_IN_MAX_LENGTH + 1), "field" => "adminLoginId"],
            "adminLoginId_文字数が足りない" => [...$validRequest, "adminLoginId" => str_repeat("a", AdminRule::LOGIN_IN_MIN_LENGTH - 1), "field" => "adminLoginId"],
            "adminPassword_最大文字数オーバー" => [...$validRequest, "adminPassword" => str_repeat("a", AdminRule::PASSWORD_MAX_LENGTH + 1), "field" => "adminPassword"],
            "adminPassword_文字数が足りない" => [...$validRequest, "adminPassword" => str_repeat("a", AdminRule::PASSWORD_MIN_LENGTH - 1), "field" => "adminPassword"],
        ];
    }

    public function test_validationエラーが発生すること_重複するキーがある場合(): void
    {
        $this->expectException(ValidationException::class);
        $duplicateKey = "duplicate_key";
        $this->createContract(overrideParams: ["key" => $duplicateKey]);

        $params = [...self::validRequest(), "contractKey" => $duplicateKey];
        new CreateContractInput(...$params);
    }

    public function test_validationエラーが発生すること_重複する管理者ログインIDがある場合(): void
    {
        $this->expectException(ValidationException::class);
        $contract = $this->createContract();
        $duplicateLoginId = "duplicate_login_id";
        $this->createStoreAdmin($contract->id, overrideParams: ["login_id" => $duplicateLoginId]);

        $params = [...self::validRequest(), "adminLoginId" => $duplicateLoginId];
        new CreateContractInput(...$params);
    }
}
