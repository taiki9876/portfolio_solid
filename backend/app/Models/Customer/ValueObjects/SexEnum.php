<?php

declare(strict_types=1);

namespace App\Models\Customer\ValueObjects;

/**
 * 性別
 */
enum SexEnum: int
{
    case UNKNOWN = 0;
    case MALE = 1;
    case FEMALE = 2;

    public function description(): string
    {
        return match ($this) {
            self::UNKNOWN => '不明',
            self::MALE => '男性',
            self::FEMALE => '女性',
        };
    }
}
