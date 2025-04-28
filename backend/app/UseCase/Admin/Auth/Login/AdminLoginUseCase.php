<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Auth\Login;

use App\Infrastructure\Repository\ContractEloquentRepository;
use App\Models\Admin\Admin;
use App\Models\Contract\ValueObjects\ContractStatusEnum;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AdminLoginUseCase
{
    public const SUPPORT_NOT_LOGIN_MESSAGE = "サポートは、この画面からログインできません。";
    public const CONTRACT_INACTIVE_MESSAGE = "契約が終了しているか、無効なアカウントです。";

    public function __construct(
        private readonly ContractEloquentRepository $contractRepository,
    ) {
    }

    /**
     * @param AdminLoginInput $input
     *
     * @return true|string
     */
    public function execute(AdminLoginInput $input): true | string
    {
        $credentials = [
            'login_id' => $input->loginId,
            'password' => $input->password,
        ];

        if (Auth::attempt($credentials, remember: true)) {
            Session::regenerate();
            /** @var Admin $admin */
            $admin = Auth::guard('admin')->user();

            $loginResult = $this->hasLoginPermission($admin);
            if ($loginResult === true) {
                return true;
            }

            Auth::logout();
            return $loginResult;
        }

        return 'ログインIDまたはパスワードが正しくありません。再度ご確認ください。';
    }

    private function hasLoginPermission(Admin $admin): true | string
    {
        if ($admin->isSystemAdmin()) {
            return true;
        }

        if ($admin->isSupportAdmin()) {
            return self::SUPPORT_NOT_LOGIN_MESSAGE;
        }

        $contract = $this->contractRepository->findById($admin->contract_id, withTrashed: true);
        if ($contract->contract_status->is(ContractStatusEnum::INACTIVE)) {
            return self::CONTRACT_INACTIVE_MESSAGE;
        }

        return true;
    }
}
