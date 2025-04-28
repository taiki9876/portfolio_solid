<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Api;

use App\Http\Controllers\Controller;
use App\Http\Response\JsonResponseBuilder;
use App\Models\Admin\Admin;
use App\UseCase\Admin\Chat\ChangeChatroomStatus\ChangeChatroomStatusInput;
use App\UseCase\Admin\Chat\ChangeChatroomStatus\ChangeChatroomStatusUseCase;
use App\UseCase\Admin\Chat\FetchChatCustomerUseCase\FetchChatCustomerUseCase;
use App\UseCase\Admin\Chat\FetchChatroomsUseCase\FetchChatroomsInput;
use App\UseCase\Admin\Chat\FetchChatroomsUseCase\FetchChatroomsUseCase;
use App\UseCase\Admin\Chat\FetchSignedUrlsUseCase\FetchSignedUrlsInput;
use App\UseCase\Admin\Chat\FetchSignedUrlsUseCase\FetchSignedUrlsUseCase;
use App\UseCase\Admin\Chat\MarkReadUseCase\MarkReadUseCase;
use App\UseCase\Admin\Chat\ProcessDeleteUseCase\ProcessDeleteInput;
use App\UseCase\Admin\Chat\ProcessDeleteUseCase\ProcessDeleteUseCase;
use App\UseCase\Admin\Chat\ProcessSendUseCase\ProcessSendUseCase;
use App\UseCase\Admin\Chat\UploadMediaUseCase\UploadMediaInput;
use App\UseCase\Admin\Chat\UploadMediaUseCase\UploadMediaUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class ChatController extends Controller
{
    public function __construct(
        private readonly FetchChatroomsUseCase $fetchJoiningChatroomsUseCase,
        private readonly FetchChatCustomerUseCase $fetchChatCustomerUseCase,
        private readonly ChangeChatroomStatusUseCase $changeChatroomStatusUseCase,
        private readonly ProcessSendUseCase $processSendUseCase,
        private readonly ProcessDeleteUseCase $processDeleteUseCase,
        private readonly UploadMediaUseCase $uploadMediaUseCase,
        private readonly FetchSignedUrlsUseCase $fetchSignedUrlsUseCase,
        private readonly MarkReadUseCase $markReadUseCase
    ) {
    }

    /**
     * @param  Request      $request
     * @return JsonResponse
     */
    public function fetchChatrooms(Request $request): JsonResponse
    {
        $input = new FetchChatroomsInput(
            $request->get('chatType') ?? "",
            $request->get('filterStatus') ?? "",
            $request->get('name') ?? "",
            $request->get('page') ?? "",
            $request->get('contractKey') ?? "",
        );
        /** @var Admin $admin */
        $admin = Auth::user();
        $output = $this->fetchJoiningChatroomsUseCase->execute($admin, $input);

        return JsonResponseBuilder::make([
            "data" => $output->value,
            "hasMore" => $output->hasMore
        ]);
    }

    /**
     * 特定のチャットルームの会員情報を取得する
     * @param  string       $chatroom_id
     * @return JsonResponse
     */
    public function fetchCustomer(string $chatroom_id): JsonResponse
    {
        $output = $this->fetchChatCustomerUseCase->execute((int) $chatroom_id);

        return JsonResponseBuilder::make($output->toArray());
    }

    /**
     * チャットルームの対応済み or スパムステータスを変更する
     * @param  string   $chatroom_id
     * @param  Request  $request
     * @return Response
     */
    public function changeStatus(string $chatroom_id, Request $request): Response
    {
        $input = new ChangeChatroomStatusInput(
            $request->get('requestStatusType'),
            (bool) $request->get('isOn'),
        );

        /** @var Admin $admin */
        $admin = Auth::user();
        $this->changeChatroomStatusUseCase->execute($admin, (int) $chatroom_id, $input);

        return response()->noContent();
    }

    /**
     * メッセージ送信後の処理を行う (例：通知処理や未読件数の更新、チャットルームステータス更新など)
     * @param  string   $chatroom_id
     * @return Response
     */
    public function processSend(string $chatroom_id): Response
    {
        /** @var Admin $admin */
        $admin = Auth::user();
        $this->processSendUseCase->execute($admin, (int) $chatroom_id);

        return response()->noContent();
    }

    /**
     * メッセージ削除時の処理を行う (最新メッセージの更新や未読件数の更新など)
     * @param  string                      $chatroom_id
     * @return Response
     * @throws ContainerExceptionInterface
     * @throws NotFoundExceptionInterface
     */
    public function processDelete(string $chatroom_id): Response
    {
        $input = new ProcessDeleteInput(
            request()->get('isLastMessageDeleted', ""),
            request()->get('isUnreadMessage', ""),
        );

        $this->processDeleteUseCase->execute((int) $chatroom_id, $input);

        return response()->noContent();
    }

    /**
     * 写真メッセージを送信する(ファイルのアップロード処理を行う)
     * @param  string              $chatroom_id
     * @param  Request             $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function uploadMedia(string $chatroom_id, Request $request): JsonResponse
    {
        $input = new UploadMediaInput(
            $request->file('media')
        );
        /** @var Admin $admin */
        $admin = Auth::user();
        $output = $this->uploadMediaUseCase->execute($admin, (int) $chatroom_id, $input);

        return JsonResponseBuilder::make($output->toArray());
    }

    /**
     * @param  string              $chatroom_id
     * @param  Request             $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function fetchSignedUrls(string $chatroom_id, Request $request): JsonResponse
    {
        $input = new FetchSignedUrlsInput(
            $request->input('mediaPaths', [])
        );
        /** @var Admin $admin */
        $admin = Auth::guard("admin")->user();
        $output = $this->fetchSignedUrlsUseCase->execute($admin, (int) $chatroom_id, $input);

        return JsonResponseBuilder::make([
            "signedUrls" => $output->values
        ]);
    }

    public function markRead(string $chatroom_id): Response
    {
        /** @var Admin $admin */
        $admin = Auth::user();
        $this->markReadUseCase->execute($admin, (int) $chatroom_id);

        return response()->noContent();
    }
}
