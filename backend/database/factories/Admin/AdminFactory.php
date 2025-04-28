<?php

declare(strict_types=1);

namespace Database\Factories\Admin;

use App\Models\Admin\Admin;
use App\Models\Admin\ValueObjects\AdminRoleEnum;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<Admin>
 */
class AdminFactory extends Factory
{
    protected $model = Admin::class;

    public function definition(): array
    {
        return [
            'contract_id' => null,//必須
            'login_id' => Str::random(6),
            'password' => '$2y$12$5HBJUXznXJhHpJiqx6Thc.brwb2hUuK/gRE0KEspBHP00EpnJOUS.', // password
            'last_login_at' => null,
            'role' => AdminRoleEnum::SYSTEM_ADMIN,
            'avatar_image_path' => null,
            'firebase_auth_uid' => Str::uuid(),
            'created_at' => now(),
            'updated_at' => now(),
            'deleted_at' => null,
        ];
    }
}
