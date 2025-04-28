<?php

declare(strict_types=1);

namespace App\Models\Contract\ValueObjects;

use App\Util\trait\EnumExtension;

enum ContractAppTypeEnum: int
{
    use EnumExtension;

    case LINE_MINI_APP = 1;
    case NATIVE_APP = 2;

    /**
     * @return string
     */
    public function description(): string
    {
        return match($this) {
            self::LINE_MINI_APP => 'LINEミニアプリ',
            self::NATIVE_APP => 'ネイティブアプリ',
        };
    }
}
