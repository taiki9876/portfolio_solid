<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Api;

use App\Http\Controllers\Controller;
use App\Http\Response\JsonResponseBuilder;
use App\Models\Admin\Admin;
use App\UseCase\Admin\ManagementNotices\FetchManagementNoticesUseCase\FetchManagementNoticesInput;
use App\UseCase\Admin\ManagementNotices\FetchManagementNoticesUseCase\FetchManagementNoticesUseCase;
use App\UseCase\Admin\ManagementNotices\FetchUnreadManagementNoticeUseCase\FetchUnreadManagementNoticeUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ManagementNoticeController extends Controller
{
    public function __construct(
        private readonly FetchManagementNoticesUseCase $fetchManagementNoticesUseCase,
        private readonly FetchUnreadManagementNoticeUseCase $fetchUnreadManagementNoticeUseCase,
    ) {
    }

    /**
     * 運営からのお知らせ一覧取得
     * @param  Request      $request
     * @return JsonResponse
     */
    public function fetchManagementNotices(Request $request): JsonResponse
    {
        $input = new FetchManagementNoticesInput(
            $request->get('perPage'),
            $request->get('page'),
        );

        /** @var Admin $admin */
        $admin = Auth::user();
        $output = $this->fetchManagementNoticesUseCase->execute($input, $admin);

        return JsonResponseBuilder::make([
            "data" => $output->value,
            "meta" => $output->meta->toArray(),
        ]);
    }

    /**
     * 運営からのお知らせを取得
     * @return JsonResponse
     */
    public function fetchUnreadManagementNotices(): JsonResponse
    {
        /** @var Admin $admin */
        $admin = Auth::user();
        $output = $this->fetchUnreadManagementNoticeUseCase->execute($admin);

        return JsonResponseBuilder::make([
            "data" => $output->toArray(),
            "hasUnread" => $output->hasUnread(),
        ]);
    }
}
