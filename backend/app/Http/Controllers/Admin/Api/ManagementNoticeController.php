<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Api;

use App\Http\Controllers\Controller;
use App\Http\Response\JsonResponseBuilder;
use App\Models\Admin\Admin;
use App\UseCase\Admin\ManagementNotices\FetchManagementNoticesUseCase\FetchManagementNoticesInput;
use App\UseCase\Admin\ManagementNotices\FetchManagementNoticesUseCase\FetchManagementNoticesUseCase;
use App\UseCase\Admin\ManagementNotices\FetchUnreadManagementNoticeUseCase\FetchUnreadManagementNoticeUseCase;
use App\UseCase\Admin\ManagementNotices\ReadManagementNoticeUseCase\ReadManagementNoticeInput;
use App\UseCase\Admin\ManagementNotices\ReadManagementNoticeUseCase\ReadManagementNoticeUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ManagementNoticeController extends Controller
{
    public function __construct(
        private readonly FetchManagementNoticesUseCase $fetchManagementNoticesUseCase,
        private readonly FetchUnreadManagementNoticeUseCase $fetchUnreadManagementNoticeUseCase,
        private readonly ReadManagementNoticeUseCase $readManagementNoticeUseCase,
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

    public function readUnreadManagementNotices(Request $request): Response
    {
        /** @var Admin $admin */
        $admin = Auth::user();
        $input = new ReadManagementNoticeInput(
            $request->input("managementNoticeId"),
        );

        $this->readManagementNoticeUseCase->execute($admin, $input);
        return response()->noContent();
    }
}
