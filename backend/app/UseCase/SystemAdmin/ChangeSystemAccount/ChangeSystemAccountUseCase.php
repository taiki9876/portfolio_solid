<?php

declare(strict_types=1);

namespace App\UseCase\SystemAdmin\ChangeSystemAccount;

use App\Infrastructure\Repository\AdminEloquentRepository;
use App\Models\Admin\Admin;
use App\Models\Admin\ValueObjects\AdminRoleEnum;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class ChangeSystemAccountUseCase
{
    public function __construct(
        private readonly AdminEloquentRepository $adminRepository,
    ) {
    }

    public function execute(): bool
    {
        /** @var Admin $admin */
        $admin = Auth::guard('admin')->user();
        if (!$admin->role->is(AdminRoleEnum::SUPPORT_ADMIN)) {
            throw new \DomainException("サポートアカウント以外はアクセスできません");
        }

        $systemAdmin = $this->adminRepository->findSystemAdmin();

        Auth::guard("admin")->login($systemAdmin);
        Session::regenerate();
        return true;
    }
}
