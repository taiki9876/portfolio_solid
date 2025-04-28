<?php

declare(strict_types=1);

namespace Database\Factories\ManagementNotice;

use App\Models\ManagementNotice\ManagementNotice;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ManagementNotice>
 */
class ManagementNoticeFactory extends Factory
{
    public function definition(): array
    {
        return [
            "title" => $this->faker->title,
            "content" => $this->faker->text,
            "is_published" => true,
            "contract_app_type" => null,
            "published_at" => now(),
            "unpublished_at" => null,
        ];
    }
}
