<?php

declare(strict_types=1);

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        then: static function () {
            Route::middleware('admin')
                ->name("admin.")
                ->group(base_path('/routes/admin.php'));
        }
    )
    ->withMiddleware(static function (Middleware $middleware) {
        $middleware->group('admin', [
            Illuminate\Cookie\Middleware\EncryptCookies::class,
            Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            Illuminate\Session\Middleware\StartSession::class,
            Illuminate\View\Middleware\ShareErrorsFromSession::class,
            Illuminate\Foundation\Http\Middleware\ValidateCsrfToken::class,
            Illuminate\Routing\Middleware\SubstituteBindings::class,
            Illuminate\Session\Middleware\AuthenticateSession::class,
        ]);

        $middleware->group('api', [
            // \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            // 'throttle:api',
            Illuminate\Routing\Middleware\SubstituteBindings::class,
        ]);

        //NOTE: 未login && authルート リダイレクト先
        $middleware->redirectGuestsTo(static function (Request $request) {
            if (Str::contains($request->path(), 'admin')) {
                return route('admin.login');
            }

            return "/";
        });

        //NOTE: login済み && guestルート リダイレクト先
        $middleware->redirectUsersTo(static function (Request $request) {
            if (Auth::guard("admin")->check()) {
                return route('admin.root');
            }

            return "/";
        });
    })
    ->withExceptions(static function (Exceptions $exceptions) {
    })->create();
