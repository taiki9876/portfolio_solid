<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\Admin\Admin;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //システム管理者のみ
        Gate::define('act-as-system-admin', static function (Admin $admin) {
            return $admin->isSystemAdmin();
        });

        //サポートのみ
        Gate::define('act-as-support-admin', static function (Admin $admin) {
            return $admin->isSupportAdmin();
        });

        //契約アカウントユーザーのみ
        Gate::define('act-as-contract', static function (Admin $admin) {
            return !($admin->isSystemAdmin() || $admin->isSupportAdmin());
        });
    }
}
