<?php

declare(strict_types=1);

namespace App\Infrastructure\Cache;

use App\Util\DateUtil;
use Carbon\CarbonImmutable;
use Illuminate\Contracts\Cache\Repository;
use Illuminate\Support\Facades\Cache;
use Psr\SimpleCache\InvalidArgumentException;

class SignedUrlCache
{
    public const STORE_NAME = "signed_url";

    private readonly Repository $store;
    private readonly string $key;

    public function __construct(string $key)
    {
        $this->store = Cache::store(self::STORE_NAME);
        $this->key = $key;
    }

    /**
     * @return array{
     *     url: string,
     *     expiredAt: string,
     * }|null
     * @throws InvalidArgumentException
     */
    public function get(): ?array
    {
        $result = $this->store->get($this->key, null);
        if ($result === null) {
            return null;
        }

        $resultArray = json_decode($result, true);
        if (empty($resultArray)) {
            return null;
        }

        return $resultArray;
    }

    /**
     * @param  string          $url
     * @param  CarbonImmutable $expiredAt
     * @return void
     */
    public function put(string $url, CarbonImmutable $expiredAt): void
    {
        $ttl = CarbonImmutable::now()->diffInSeconds($expiredAt);
        $value = json_encode(["url" => $url, "expiredAt" => $expiredAt->format(DateUtil::DATE_FORMAT)]);
        $this->store->put($this->key, $value, (int) $ttl);
    }
}
