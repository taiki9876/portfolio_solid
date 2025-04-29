<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Api\SystemAdmin;

use App\Http\Controllers\Controller;
use App\Http\Response\JsonResponseBuilder;
use App\UseCase\SystemAdmin\CreateManagementNoticeUseCase\CreateManagementNoticeInput;
use App\UseCase\SystemAdmin\CreateManagementNoticeUseCase\CreateManagementNoticeUseCase;
use App\UseCase\SystemAdmin\DeleteManagementNoticeUseCase\DeleteManagementNoticeUseCase;
use App\UseCase\SystemAdmin\EditManagementNoticeUseCase\EditManagementNoticeInput;
use App\UseCase\SystemAdmin\EditManagementNoticeUseCase\EditManagementNoticeUseCase;
use App\UseCase\SystemAdmin\FetchManagementNoticesUseCase\FetchManagementNoticesInput;
use App\UseCase\SystemAdmin\FetchManagementNoticesUseCase\FetchManagementNoticesUseCase;
use App\UseCase\SystemAdmin\FetchManagementNoticeUseCase\FetchManagementNoticeUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SystemAdminManagementNoticeController extends Controller
{
    public function __construct(
        private readonly FetchManagementNoticesUseCase $fetchManagementNoticesUseCase,
        private readonly FetchManagementNoticeUseCase $fetchManagementNoticeUseCase,
        private readonly CreateManagementNoticeUseCase $createManagementNoticeUseCase,
        private readonly EditManagementNoticeUseCase $editManagementNoticeUseCase,
        private readonly DeleteManagementNoticeUseCase $deleteManagementNoticeUseCase,
    ) {
    }

    /**
     * 運営からのお知らせ一覧を取得する
     * @param  Request      $request
     * @return JsonResponse
     */
    public function fetchManagementNotices(Request $request): JsonResponse
    {
        $input = new FetchManagementNoticesInput($request->input("searchWord", ""));
        $output = $this->fetchManagementNoticesUseCase->execute($input);

        return JsonResponseBuilder::make([
            'notices' => $output->values,
        ]);
    }

    /**
     * 運営からのお知らせを取得する
     * @param  int          $noticeId
     * @return JsonResponse
     */
    public function fetchManagementNotice(int $noticeId): JsonResponse
    {
        $output = $this->fetchManagementNoticeUseCase->execute($noticeId);

        return JsonResponseBuilder::make([
            'notice' => $output->toArray(),
        ]);
    }

    /**
     * 運営からのお知らせを作成する
     * @param  Request      $request
     * @return JsonResponse
     */
    public function createManagementNotice(Request $request): JsonResponse
    {
        $input = new CreateManagementNoticeInput(
            $request->input('title'),
            $request->input('content'),
            $request->input('isPublished'),
            $request->input('showPopup'),
            $request->input('publishedAt'),
            $request->input('unpublishedAt'),
            $request->input('contractAppType'),
        );
        $notice = $this->createManagementNoticeUseCase->execute($input);
        return JsonResponseBuilder::make([
            'noticeId' => $notice->id,
        ]);
    }

    public function editManagementNotice(int $noticeId, Request $request): JsonResponse
    {
        $input = new EditManagementNoticeInput(
            $request->input('title'),
            $request->input('content'),
            $request->input('isPublished'),
            $request->input('publishedAt'),
            $request->input('unpublishedAt'),
            $request->input('contractAppType'),
        );
        $this->editManagementNoticeUseCase->execute($noticeId, $input);

        return JsonResponseBuilder::make([
            'noticeId' => $noticeId,
        ]);
    }

    public function deleteManagementNotice(int $noticeId): JsonResponse
    {
        $result = $this->deleteManagementNoticeUseCase->execute($noticeId);

        return JsonResponseBuilder::make([
            'isSuccess' => $result,
        ]);
    }
}
