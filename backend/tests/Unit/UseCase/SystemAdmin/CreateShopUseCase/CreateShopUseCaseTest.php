<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\SystemAdmin\CreateShopUseCase;

use App\Infrastructure\Storage\S3\S3PublicStorage;
use App\UseCase\SystemAdmin\CreateShopUseCase\CreateShopInput;
use App\UseCase\SystemAdmin\CreateShopUseCase\CreateShopUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Mockery;
use Tests\Helper\ContractCreator;
use Tests\Helper\Mock\S3StorageMock;
use Tests\TestCase;

class CreateShopUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use S3StorageMock;

    public function test_execute_店舗作成できること(): void
    {
        //Given
        $contract = $this->createContract();
        $params = $this->params();
        $input = new CreateShopInput(...$params);

        // When
        $shop = resolve(CreateShopUseCase::class)->execute($contract->id, $input);

        // Then
        self::assertDatabaseHas("shops", [
            "id" => $shop->id,
            "contract_id" => $contract->id,
            "name" => $params["name"],
            "app_display_name" => $params["appDisplayName"],
            "business_hours" => $params["businessHours"],
            "rest" => $params["rest"],
            "tel" => $params["tel"],
            "address" => $params["address"],
            "prelusion" => $params["prelusion"],
            "hp_url" => $params["hpUrl"],
            "map_url" => $params["mapUrl"],
            "created_at" => $shop->created_at,
            "updated_at" => $shop->updated_at,
            "deleted_at" => null,
        ]);
    }

    public function test_execute_店舗作成と画像アップロードされること(): void
    {
        //Given
        $contract = $this->createContract();

        $dummyPath = "dummy/path";
        $image = UploadedFile::fake()->image("image.jpg");
        $params = $this->params([$image]);
        $input = new CreateShopInput(...$params);

        // When
        $storageMock = Mockery::mock(S3PublicStorage::class);
        /** @phpstan-ignore-next-line */
        $storageMock
            ->shouldReceive('storeAs')
            ->once()
            ->with($image, Mockery::type('string'))
            ->andReturn($dummyPath);
        $this->setPublicBucketMock($storageMock);
        $shop = resolve(CreateShopUseCase::class)->execute($contract->id, $input);

        // Then
        self::assertDatabaseHas("shops", ["id" => $shop->id]);
        self::assertDatabaseHas(
            "shop_images",
            [
                "shop_id" => $shop->id,
                "image_path" => $dummyPath,
                "sort_order" => 1
            ]
        );
    }

    /**
     * @param  UploadedFile[]       $images
     * @return array<string, mixed>
     */
    private function params(array $images = []): array
    {
        return [
            "name" => "店名",
            "appDisplayName" => "アプリ表示名",
            "businessHours" => "営業時間",
            "rest" => "定休日",
            "tel" => "電話番号",
            "address" => "住所",
            "prelusion" => "紹介文",
            "hpUrl" => "https://example.com/hp",
            "mapUrl" => "https://example.com/map",
            "images" => $images,
        ];
    }
}
