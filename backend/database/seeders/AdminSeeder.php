<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Admin\Admin;
use App\Models\Admin\ValueObjects\AdminRoleEnum;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        //システム管理者
        Admin::factory()->create([
            'login_id' => 'admin',
            'role' => AdminRoleEnum::SYSTEM_ADMIN
        ]);
    }
}
