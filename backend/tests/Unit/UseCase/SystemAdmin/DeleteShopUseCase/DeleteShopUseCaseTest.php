<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\SystemAdmin\DeleteShopUseCase;

use App\Infrastructure\Storage\S3\S3PublicStorage;
use App\UseCase\SystemAdmin\DeleteShopUseCase\DeleteShopUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Tests\Helper\ContractCreator;
use Tests\Helper\Mock\S3StorageMock;
use Tests\Helper\ShopCreator;
use Tests\TestCase;

class DeleteShopUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use ShopCreator;
    use S3StorageMock;

    public function test_execute_店舗を削除できること(): void
    {
        // Given
        $contract = $this->createContract();
        $shop = $this->createShop($contract->id);

        // When
        $useCase = resolve(DeleteShopUseCase::class);
        $actual = $useCase->execute($contract->id, $shop->id);

        // Then
        self::assertTrue($actual);
    }

    public function test_execute_店舗を削除できること_画像があれば同時に削除されること(): void
    {
        // Given
        $contract = $this->createContract();
        $shop = $this->createShop($contract->id);
        $shopImage = $this->createShopImage($shop->id);

        $storageMock = Mockery::mock(S3PublicStorage::class);
        /** @phpstan-ignore-next-line */
        $storageMock
            ->shouldReceive('delete')
            ->once()
            ->with([$shopImage->image_path])
            ->andReturn(true);
        $this->setPublicBucketMock($storageMock);

        // When
        $useCase = resolve(DeleteShopUseCase::class);
        $actual = $useCase->execute($contract->id, $shop->id);

        // Then
        self::assertTrue($actual);
    }

    public function test_execute_店舗を削除できること_別契約の店舗は削除できないこと(): void
    {
        // Given
        $contract = $this->createContract();
        $shop = $this->createShop($contract->id);

        $anotherContract = $this->createContract();

        // When
        $this->expectException(\DomainException::class);
        $useCase = resolve(DeleteShopUseCase::class);
        $actual = $useCase->execute($anotherContract->id, $shop->id);

        // Then
        self::assertFalse($actual);
    }
}
