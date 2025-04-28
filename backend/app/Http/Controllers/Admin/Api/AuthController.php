<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Api;

use App\Http\Controllers\Controller;
use App\Http\Response\JsonResponseBuilder;
use App\Models\Admin\Admin;
use App\UseCase\Admin\Auth\FetchProfileUseCase\FetchProfileUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct(
        private readonly FetchProfileUseCase $fetchProfileUseCase
    ) {
    }

    /**
     * @param Request $request
     *
     * @return Response
     */
    public function logout(Request $request): Response
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->noContent();
    }

    /**
     * @return JsonResponse
     */
    public function profile(): JsonResponse
    {
        /** @var Admin $admin */
        $admin = Auth::user();

        $output = $this->fetchProfileUseCase->execute($admin);

        return JsonResponseBuilder::make($output->toArray());
    }
}
