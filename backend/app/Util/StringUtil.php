<?php

declare(strict_types=1);

namespace App\Util;

use Illuminate\Http\UploadedFile;

class StringUtil
{
    /**
     * @param string $string
     *
     * @return string
     */
    public static function snakeToCamel(string $string): string
    {
        return lcfirst(str_replace('_', '', ucwords($string, '_')));
    }

    /**
     * 空文字やnullの場合に指定したデフォルト値を返す
     * @param string|null $target
     * @param string      $default
     *
     * @return string
     */
    public static function defaultIfBlank(string|null $target, string $default): string
    {
        if ($target === null || self::isEmptyString($target)) {
            return $default;
        }

        return $target;
    }

    /**
     * 空白文字やnullなど意味のない文字列かどうか
     * @param  string|null $target
     * @return bool
     */
    public static function isEmptyString(string|null $target): bool
    {
        if ($target === "" || $target === null) {
            return true;
        }
        return preg_match('/^[\s　]+$/u', $target) === 1;
    }

    /**
     * 文字列をbool値に変換する
     * @param  string|bool|null $target
     * @return bool
     */
    public static function toBool(string|null|bool $target): bool
    {
        return filter_var($target, \FILTER_VALIDATE_BOOLEAN);
    }

    public static function createRandomFileName(UploadedFile $file): string
    {
        return now()->format("Ymd") . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
    }
}
