<?php

declare(strict_types=1);

namespace App\Infrastructure\Repository;

use App\Models\Shop\Shop;
use App\Models\Shop\ShopImage;
use Carbon\CarbonImmutable;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class ShopEloquentRepository
{
    public function save(Shop $shop): Shop
    {
        if ($shop->id === null) {
            $shop->save();
            $shop->images->each(static fn ($img) => $img->shop_id = $shop->id);
            $shop->images()->saveMany($shop->images->all());
        } else {
            $shop->updated_at = CarbonImmutable::now();
            Shop::query()
                ->where('id', $shop->id)
                ->update(
                    Arr::except(
                        $shop->only($shop->getFillable()),
                        ['images']
                    )
                );
            $this->updateImages($shop);
        }

        return $shop->refresh()->load('images');
    }

    /**
     * 画像の更新
     * @param  Shop $shop
     * @return void
     */
    private function updateImages(Shop $shop): void
    {
        $now = CarbonImmutable::now();

        /** @var Collection<int, ShopImage> $newImages */
        $newImages = $shop->images ?? collect();
        $currentImages = ShopImage::query()->where("shop_id", $shop->id)->get()->keyBy("image_path");

        $imagePathsToKeep = [];
        foreach ($newImages as $image) {
            $imagePathsToKeep[] = $image->image_path;
            if (!property_exists($image, ShopImage::PRIMARY_KEY)) {
                // Insert
                $image->belongTo($shop);
                $image->save();
                continue;
            }

            // Update
            /** @var ShopImage $original */
            $original = $currentImages->get($image->image_path);
            if ($original->sort_order !== $image->sort_order) {
                $original->sort_order = $image->sort_order;
                $original->updated_at = $now;
                $original->save();
            }
        }

        //Delete
        ShopImage::query()
            ->where("shop_id", $shop->id)
            ->whereNotIn('image_path', $imagePathsToKeep)
            ->delete();
    }

    public function findById(int $id): Shop
    {
        return Shop::query()->where("id", $id)->firstOrFail();
    }

    public function removeBy(Shop|int $shop): bool
    {
        $id = $shop instanceof Shop ? $shop->id : $shop;
        $result = Shop::query()->where("id", $id)->delete();

        if ($result === 0) {
            return false;
        };

        ShopImage::query()->where("shop_id", $id)->delete();
        return true;
    }
}
