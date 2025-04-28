<?php

declare(strict_types=1);

namespace App\Util\trait;

trait EnumExtension
{
    public function is(self $enum): bool
    {
        return $this->value === $enum->value;
    }

    /**
     * @return array<string | int>
     */
    public static function values(): array
    {
        return array_map(static fn (self $case) => $case->value, self::cases());
    }

    /**
     * @return array<string>
     */
    public static function names(): array
    {
        return array_map(static fn (self $case) => $case->name, self::cases());
    }
}
