<?php

declare(strict_types=1);

namespace App\Models\Contract\Rule;

use App\Models\Contract\ValueObjects\ContractAppTypeEnum;
use App\Models\Contract\ValueObjects\ContractStatusEnum;

class ContractFieldRule
{
    public const NAME_MAX_LENGTH = 80;
    public const KEY_MAX_LENGTH = 50;
    public const KEY_REGEX = "/^[a-zA-Z0-9_-]+$/";//英数字とハイフン、アンダースコアのみ

    public const KEY_ALIAS_MAX_LENGTH = 5;
    public const PERSON_IN_CHARGE_MAX_LENGTH = 100;
    public const TEL_MAX_LENGTH = 20;
    public const EMAIL_MAX_LENGTH = 255;
    public const INDUSTRY_MAX_LENGTH = 50;
    public const MEMO_MAX_LENGTH = 2000;

    /**
     * @param  string[]                $ignoreKeys
     * @return array<string, string[]>
     */
    public static function validationRules(array $ignoreKeys = []): array
    {
        $rules = [
            'contractName' => ['required', 'string', 'max: ' . self::NAME_MAX_LENGTH],
            'contractKey' => ['required', 'string', 'max: ' . self::KEY_MAX_LENGTH, 'regex:' . self::KEY_REGEX, "unique:contracts,key"],
            'contractKeyAlias' => ['required', 'string', 'max: ' . self::KEY_ALIAS_MAX_LENGTH, 'regex:' . self::KEY_REGEX],
            'personInCharge' => ['nullable', 'string', 'max: ' . self::PERSON_IN_CHARGE_MAX_LENGTH],
            'tel' => ['nullable', 'string', 'max: ' . self::TEL_MAX_LENGTH],
            'email' => ['nullable', 'string', 'max: ' . self::EMAIL_MAX_LENGTH, "email"],
            'industry' => ['nullable', 'string', 'max: ' . self::INDUSTRY_MAX_LENGTH],
            'memo' => ['nullable', 'string', 'max: ' . self::MEMO_MAX_LENGTH],
            'contractStatus' => ['required', 'integer', 'in:' . implode(',', ContractStatusEnum::values())],
            'contractAppType' => ['required', 'integer', 'in:' . implode(',', ContractAppTypeEnum::values())],
        ];

        foreach ($ignoreKeys as $key) {
            unset($rules[$key]);
        }
        return $rules;
    }

    /**
     * @return array<string, string>
     */
    public static function validationMessages(): array
    {
        return [
            'contractKey.unique' => '契約キーは既に使用されています',
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function validationAttribute(): array
    {
        return [
            "contractName" => "名前",
            "contractKey" => "契約キー",
            "contractKeyAlias" => "短縮キー",
            "personInCharge" => "担当者名",
            "tel" => "電話番号",
            "email" => "メールアドレス",
            "industry" => "業種",
            "memo" => "メモ",
        ];
    }
}
