<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\DeleteShopUseCase;

use App\Infrastructure\Repository\ShopEloquentRepository;
use App\Infrastructure\Storage\S3\DirectoryEnum;
use App\Infrastructure\Storage\S3\S3PublicStorage;
use App\Models\Shop\Shop;
use App\Models\Shop\ShopImage;

class DeleteShopUseCase
{
    public function __construct(
        private readonly ShopEloquentRepository $shopRepository,
        private readonly S3PublicStorage $s3PublicStorage
    ) {
    }

    public function execute(int $contractId, int $shopId): bool
    {
        $targetShop = $this->shopRepository->findById($shopId);

        if ($targetShop->contract_id !== $contractId) {
            throw new \DomainException("店舗を削除できません。契約アカウントが違います。");
        }

        $this->deleteShopImageIfExits($targetShop, $contractId);

        return $this->shopRepository->removeBy($targetShop);
    }

    private function deleteShopImageIfExits(Shop $shop, int $contractId): void
    {
        $imagePaths = $shop->images->map(static fn (ShopImage $image) => $image->image_path);
        if ($imagePaths->count() > 0) {
            $shopImageStorage = $this->s3PublicStorage->make($contractId, DirectoryEnum::SHOP_IMAGE);
            $shopImageStorage->delete($imagePaths->toArray());
        }
    }
}
