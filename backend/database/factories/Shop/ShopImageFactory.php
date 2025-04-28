<?php

declare(strict_types=1);

namespace Database\Factories\Shop;

use App\Models\Shop\ShopImage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ShopImage>
 */
class ShopImageFactory extends Factory
{
    protected $model = ShopImage::class;

    public function definition(): array
    {
        return [
            "shop_id" => null, //指定必須
            "image_path" => $this->faker->imageUrl(),
        ];
    }
}
