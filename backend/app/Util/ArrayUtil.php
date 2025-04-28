<?php

declare(strict_types=1);

namespace App\Util;

class ArrayUtil
{
    /**
     * 特定キー
     *
     * @param array<string, mixed> $array
     * @param array<string>        $keys
     *
     * @return array<string, mixed> void
     */
    public static function pluckKeys(array $array, array $keys): array
    {
        return array_filter(
            $array,
            static function ($key) use ($keys) {
                return in_array($key, $keys, true); // 指定したキーが存在する場合のみフィルタリング
            },
            \ARRAY_FILTER_USE_KEY // キーを基準にフィルタリング
        );
    }
}
