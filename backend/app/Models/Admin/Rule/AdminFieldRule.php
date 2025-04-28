<?php

declare(strict_types=1);

namespace App\Models\Admin\Rule;

class AdminFieldRule
{
    public const LOGIN_IN_MAX_LENGTH = 50;
    public const LOGIN_IN_MIN_LENGTH = 6;

    public const PASSWORD_MAX_LENGTH = 20;
    public const PASSWORD_MIN_LENGTH = 8;

    /**
     * @return array<string, string[]>
     */
    public static function validationRules(): array
    {
        return [
            'adminLoginId' => ['string', 'max: ' . self::LOGIN_IN_MAX_LENGTH, "min: " . self::LOGIN_IN_MIN_LENGTH, "unique:admins,login_id"],
            'adminPassword' => ['string', 'max: ' . self::PASSWORD_MAX_LENGTH, 'min: ' . self::PASSWORD_MIN_LENGTH],
        ];
    }

    /**
     * @return array<string, string>
     */
    public static function validationAttribute(): array
    {
        return [
            "adminLoginId" => "ログインID",
            "adminPassword" => "パスワード",
        ];
    }
}
