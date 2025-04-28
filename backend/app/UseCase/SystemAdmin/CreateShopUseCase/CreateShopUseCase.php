<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\CreateShopUseCase;

use App\Infrastructure\Repository\ContractEloquentRepository;
use App\Infrastructure\Repository\ShopEloquentRepository;
use App\Infrastructure\Storage\S3\DirectoryEnum;
use App\Infrastructure\Storage\S3\S3PublicStorage;
use App\Models\Contract\Contract;
use App\Models\Shop\Shop;
use App\Models\Shop\ShopFactory;
use App\Models\Shop\ShopImage;
use App\Util\StringUtil;
use DomainException;
use Illuminate\Http\UploadedFile;

class CreateShopUseCase
{
    public function __construct(
        private readonly ContractEloquentRepository $contractRepository,
        private readonly ShopEloquentRepository $shopRepository,
        private readonly S3PublicStorage $s3PublicStorage,
    ) {
    }

    public function execute(int $contractId, CreateShopInput $input): Shop
    {
        $contract = $this->contractRepository->findById($contractId);
        $paths = $this->uploadImagesIfExists($contract, $input->images);

        $shop = ShopFactory::init(
            $contract,
            $input->name,
            $input->appDisplayName,
            $input->businessHours,
            $input->rest,
            $input->tel,
            $input->address,
            $input->prelusion,
            $input->hpUrl,
            $input->mapUrl,
            $this->makeShopImages($paths),
        );
        return $this->shopRepository->save($shop);
    }

    /**
     * @param  Contract            $contract
     * @param  array<UploadedFile> $images
     * @return string[]
     * @throws \Exception
     */
    private function uploadImagesIfExists(Contract $contract, array $images): array
    {
        if (count($images) <= 0) {
            return [];
        }

        $paths = [];
        $storage = $this->s3PublicStorage->make($contract, DirectoryEnum::SHOP_IMAGE);
        foreach ($images as $image) {
            $path = $storage->storeAs(
                $image,
                StringUtil::createRandomFileName($image),
            );

            if ($path === false) {
                throw new DomainException("ファイルのアップロードに失敗しました。");
            }
            $paths[] = $path;
        }

        return $paths;
    }

    /**
     * @param  string[]         $paths
     * @return array<ShopImage>
     */
    private function makeShopImages(array $paths): array
    {
        $shopImages = [];
        foreach ($paths as $index => $path) {
            $shopImages[] = ShopImage::init($path, $index + 1);
        }

        return $shopImages;
    }
}
