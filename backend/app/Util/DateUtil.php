<?php

declare(strict_types=1);

namespace App\Util;

use Carbon\Carbon;
use Carbon\CarbonImmutable;

class DateUtil
{
    public const DATE_FORMAT = "Y-m-d H:i:s";

    /**
     * 値を CarbonImmutable に変換する
     *
     * @param string|CarbonImmutable|Carbon|null $value
     *
     * @return CarbonImmutable|null
     */
    public static function nullableCarbon(string|CarbonImmutable|Carbon|null $value): ?CarbonImmutable
    {
        if ($value === null) {
            return null;
        }

        if ($value instanceof CarbonImmutable) {
            return $value;
        }

        if ($value instanceof Carbon) {
            return $value->toImmutable();
        }

        return CarbonImmutable::parse($value);
    }
}
