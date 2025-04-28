<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Web;

use App\Http\Controllers\Controller;
use App\UseCase\Admin\Auth\Login\AdminLoginInput;
use App\UseCase\Admin\Auth\Login\AdminLoginUseCase;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        private readonly AdminLoginUseCase $loginUseCase,
    ) {
    }

    /**
     * @return View
     */
    public function showLoginForm(): View
    {
        return view('auth.login');
    }

    /**
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function login(Request $request): RedirectResponse
    {
        $input = new AdminLoginInput(
            $request->login_id ?? "",
            $request->password ?? "",
        );
        $result = $this->loginUseCase->execute($input);
        if ($result === true) {
            return redirect()->intended(route('admin.root'));
        }

        return back()->withErrors(['message' => $result])->onlyInput('login_id');
    }
}
