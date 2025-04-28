<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\EditShopUseCase;

use App\Infrastructure\Repository\ShopEloquentRepository;
use App\Infrastructure\Storage\S3\DirectoryEnum;
use App\Infrastructure\Storage\S3\S3PublicStorage;
use App\Models\Shop\Shop;
use App\Models\Shop\ShopImage;
use App\Util\StringUtil;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\UploadedFile;

class EditShopUseCase
{
    public function __construct(
        private readonly ShopEloquentRepository $shopRepository,
        private readonly S3PublicStorage $s3PublicStorage,
    ) {
    }

    public function execute(int $contractId, int $shopId, EditShopInput $input, EditShopImageInput $imageInput): Shop
    {
        $shop = $this->shopRepository->findById($shopId);
        if ($shop->contract_id !== $contractId) {
            throw new ModelNotFoundException("店舗が見つかりませんでした。");
        }

        $shop->edit(
            $input->name,
            $input->appDisplayName,
            $input->businessHours,
            $input->rest,
            $input->tel,
            $input->address,
            $input->prelusion,
            $input->hpUrl,
            $input->mapUrl,
            $this->makeShopImage($contractId, $imageInput),
        );

        return $this->shopRepository->save($shop);
    }

    /**
     * @param  int                $contractId
     * @param  EditShopImageInput $input
     * @return ShopImage[]
     * @throws Exception
     */
    private function makeShopImage(int $contractId, EditShopImageInput $input): array
    {
        $storage = $this->s3PublicStorage->make($contractId, DirectoryEnum::SHOP_IMAGE);

        return array_map(function ($image) use ($storage) {
            if ($image instanceof ShopImage) {
                return $image;
            }

            $path = $this->uploadImage($image["file"], $storage);
            return ShopImage::init($path, $image["sortOrder"]);
        }, $input->images);
    }

    private function uploadImage(UploadedFile $uploadFile, S3PublicStorage $storage): string
    {
        $path = $storage->storeAs($uploadFile, StringUtil::createRandomFileName($uploadFile));
        if ($path === false) {
            throw new \DomainException("ファイルのアップロードに失敗しました。");
        }
        return $path;
    }
}
