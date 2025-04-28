<?php

declare(strict_types=1);

namespace Tests\Helper\Mock;

use App\Infrastructure\Storage\S3\S3PrivateStorage;
use App\Infrastructure\Storage\S3\S3PublicStorage;
use Mockery;

/**
 * @phpstan-type PrivateStorageMock Mockery\LegacyMockInterface|(Mockery\MockInterface&S3PrivateStorage)
 * @phpstan-type PublicStorageMock Mockery\LegacyMockInterface|(Mockery\MockInterface&S3PublicStorage)
 */
trait S3StorageMock
{
    /**
     * S3ストレージクラスのモックを作成(プライベート))
     *
     * @param  PrivateStorageMock $mock
     * @return void
     */
    public function setPrivateBucketMock(
        (Mockery\MockInterface&S3PrivateStorage)|Mockery\LegacyMockInterface $mock,
    ): void {
        $privateBucket = Mockery::mock(S3PrivateStorage::class)->makePartial();
        /** @phpstan-ignore-next-line */
        $privateBucket
            ->shouldReceive('make')
            ->andReturn($mock);

        app()->instance(S3PrivateStorage::class, $privateBucket);
    }

    /**
     * S3ストレージクラスのモックを作成(パブリック)
     *
     * @param  PublicStorageMock $mock
     * @return void
     */
    public function setPublicBucketMock(
        (Mockery\MockInterface&S3PublicStorage)|Mockery\LegacyMockInterface $mock,
    ): void {
        $publicBucket = Mockery::mock(S3PublicStorage::class)->makePartial();
        /** @phpstan-ignore-next-line */
        $publicBucket
            ->shouldReceive('make')
            ->andReturn($mock);

        app()->instance(S3PublicStorage::class, $publicBucket);
    }
}
