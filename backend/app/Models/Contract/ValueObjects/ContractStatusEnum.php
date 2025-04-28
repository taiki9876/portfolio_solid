<?php

declare(strict_types=1);

namespace App\Models\Contract\ValueObjects;

use App\Util\trait\EnumExtension;

enum ContractStatusEnum: int
{
    use EnumExtension;

    case ACTIVE = 1;
    case INACTIVE = 0;

    /**
     * @return string
     */
    public function description(): string
    {
        return match($this) {
            self::ACTIVE => '有効',
            self::INACTIVE => '無効',
        };
    }
}
