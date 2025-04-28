<?php

declare(strict_types=1);

namespace App\Models\Admin\Services;

use App\Infrastructure\Firebase\FirebaseAuth;
use App\Infrastructure\Repository\AdminEloquentRepository;
use App\Models\Admin\Admin;
use App\Models\Admin\ValueObjects\AdminRoleEnum;
use App\Models\Contract\Contract;
use Kreait\Firebase\Exception\AuthException;
use Kreait\Firebase\Exception\FirebaseException;

class AdminCreator
{
    public function __construct(
        private readonly AdminEloquentRepository $adminRepository,
        private readonly FirebaseAuth $firebaseAuth
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

        $role = $admin->role;
        if (!$role->is(AdminRoleEnum::SYSTEM_ADMIN) && !$role->is(AdminRoleEnum::SUPPORT_ADMIN)) {
            //NOTE: 管理者やサポートはFirebaseのユーザーを作成しない (チャット問い合わせの利用はないため)
            $this->firebaseAuth->createAuthUser($contract, $admin);
        }

        return $admin;
    }
}
