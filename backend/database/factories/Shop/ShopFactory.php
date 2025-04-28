<?php

declare(strict_types=1);

namespace Database\Factories\Shop;

use App\Models\Shop\Shop;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Shop>
 */
class ShopFactory extends Factory
{
    protected $model = Shop::class;

    public function definition(): array
    {
        return [
            "contract_id" => null,
            "name" => $this->faker->name(),
            "app_display_name" => $this->faker->name(),
            "business_hours" => null,
            "rest" => null,
            "tel" => null,
            "address" => null,
            "prelusion" => null,
            "hp_url" => null,
            "map_url" => null,
        ];
    }
}
