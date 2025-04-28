<?php

declare(strict_types=1);

namespace App\Util;

class Env
{
    /**
     * @return bool
     */
    public static function isLocal(): bool
    {
        return getenv('APP_ENV') === 'local';
    }

    /**
     * @return bool
     */
    public static function isTesting(): bool
    {
        return getenv('APP_ENV') === 'testing';
    }

    /**
     * @return bool
     */
    public static function isProduction(): bool
    {
        return getenv('APP_ENV') === 'production';
    }

    /**
     * @param  string|null $relativePath
     * @return string
     */
    public static function publicBucketUrl(?string $relativePath = null): string
    {
        if ($relativePath !== null) {
            return config('filesystems.disks.s3_public.url') . '/' . $relativePath;
        }

        return config('filesystems.disks.s3_public.url');
    }
}
