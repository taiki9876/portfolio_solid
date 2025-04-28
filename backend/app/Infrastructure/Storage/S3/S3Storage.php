<?php

declare(strict_types=1);

namespace App\Infrastructure\Storage\S3;

use App\Infrastructure\Cache\SignedUrlCache;
use App\Util\DateUtil;
use Carbon\CarbonImmutable;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Http\UploadedFile;
use Psr\SimpleCache\InvalidArgumentException;

/**
 * @internal
 *
 * @description S3Storage
 * Methods for reading and writing S3 are defined here
 */
class S3Storage
{
    public function __construct(
        private readonly string $uploadDirectory,
        private readonly FilesystemAdapter $storage
    ) {
    }

    private function validInstance(): void
    {
        if ($this->uploadDirectory === "") {
            throw new \DomainException("バケットのディレクトリが設定されていません。各バケットのmakeメソッドを使用してください。");
        }
    }

    /**
     * @param string $filePath
     * @param int    $validityPeriodHour
     * @param bool   $needException
     * @return array{
     *     url: string|null,
     *     expiredAt: string,
     * }
     * @throws InvalidArgumentException
     */
    public function generateSignedUrl(string $filePath, int $validityPeriodHour = 2, bool $needException = false): array
    {
        $this->validInstance();

        $expiredAt = CarbonImmutable::now()->addHours($validityPeriodHour);
        $path = implode('/', [$this->uploadDirectory, $filePath]);

        if (!$this->storage->exists($path)) {
            if ($needException) {
                throw new \DomainException("ファイルが見つかりませんでした。");
            }
            return [
                'url' => null,
                'expiredAt' => $expiredAt->format(DateUtil::DATE_FORMAT),
            ];
        }

        $cacheStore = new SignedUrlCache("signed_url_{$path}");

        $cache = $cacheStore->get();
        if ($cache !== null) {
            return [
                "url" => $cache["url"],
                "expiredAt" => $cache["expiredAt"],
            ];
        }

        $signedUrl = $this->storage->temporaryUrl($path, $expiredAt);
        $cacheStore->put($signedUrl, $expiredAt);

        return [
            'url' => $signedUrl,
            'expiredAt' => $expiredAt->format(DateUtil::DATE_FORMAT)
        ];
    }

    /**
     * @param  UploadedFile $file
     * @param  string       $fileName
     * @return string|false
     */
    public function storeAs(UploadedFile $file, string $fileName): string|false
    {
        $this->validInstance();

        return $this->storage->putFileAs(
            $this->uploadDirectory,
            $file,
            $fileName
        );
    }

    /**
     * @param  string[] $paths
     * @return bool
     */
    public function delete(array $paths): bool
    {
        $this->validInstance();

        return $this->storage->delete($paths);
    }
}
