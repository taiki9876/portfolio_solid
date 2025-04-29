<?php

declare(strict_types=1);

namespace App\Models\Admin\Services;

use App\Infrastructure\Repository\AdminEloquentRepository;
use App\Models\Admin\Admin;
use App\Models\Contract\Contract;
use Kreait\Firebase\Exception\AuthException;
use Kreait\Firebase\Exception\FirebaseException;

class AdminCreator
{
    public function __construct(
        private readonly AdminEloquentRepository $adminRepository,
    ) {
    }

    /**
     * 管理者アカウントの作成
     * @param  Contract          $contract
     * @param  Admin             $admin
     * @return Admin
     * @throws AuthException
     * @throws FirebaseException
     */
    public function createAdmin(Contract $contract, Admin $admin): Admin
    {
        $admin = $this->adminRepository->save($admin);
        return $admin;
    }
}
