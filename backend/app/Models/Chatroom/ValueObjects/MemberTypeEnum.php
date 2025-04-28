<?php

declare(strict_types=1);

namespace App\Models\Chatroom\ValueObjects;

use App\Util\trait\EnumExtension;

enum MemberTypeEnum: string
{
    use EnumExtension;

    case STAFF = "staff";
    case CUSTOMER = "customer";

    public function description(): string
    {
        return match ($this) {
            self::STAFF => 'スタッフ',//スタッフ≒管理者
            self::CUSTOMER => '会員',
        };
    }
}
