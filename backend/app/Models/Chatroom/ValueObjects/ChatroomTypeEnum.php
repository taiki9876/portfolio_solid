<?php

declare(strict_types=1);

namespace App\Models\Chatroom\ValueObjects;

use InvalidArgumentException;

enum ChatroomTypeEnum: int
{
    case STORE = 0;
    case STAFF = 1;

    public function description(): string
    {
        return match ($this) {
            self::STORE => 'store',
            self::STAFF => 'staff',
        };
    }

    public static function fromDescription(string $description): self
    {
        return match ($description) {
            'store' => self::STORE,
            'staff' => self::STAFF,
            default => throw new InvalidArgumentException('不正な値です'),
        };
    }
}
