<?php

declare(strict_types=1);

namespace Database\Factories\ManagementNotice;

use App\Models\ManagementNotice\NoticeRead;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<NoticeRead>
 */
class NoticeReadFactory extends Factory
{
    public function definition(): array
    {
        return [
            "management_notice_id" => null,//必須
            "admin_id" => null,//必須
            "read_at" => now(),
            "created_at" => now(),
        ];
    }
}
