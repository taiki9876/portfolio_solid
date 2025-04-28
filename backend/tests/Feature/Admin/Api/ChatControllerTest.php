<?php

declare(strict_types=1);

namespace Tests\Feature\Admin\Api;

use App\Infrastructure\Repository\Firestore\ChatroomSummaryRepository;
use App\Models\Admin\ValueObjects\AdminRoleEnum;
use App\Models\Chatroom\ChatroomMember;
use App\Models\Chatroom\ValueObjects\ChatroomTypeEnum;
use App\UseCase\Admin\Chat\ChangeChatroomStatus\RequestStatusEnum;
use App\Util\DateUtil;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\TestResponse;
use Symfony\Component\HttpFoundation\Response;
use Tests\Helper\AdminCreator;
use Tests\Helper\ChatroomCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\TestCase;

class ChatControllerTest extends TestCase
{
    public const ROUTE_NAME = "admin.api.chat.chatrooms";

    use RefreshDatabase;
    use AdminCreator;
    use ContractCreator;
    use CustomerCreator;
    use ChatroomCreator;

    public function test_fetchChatrooms_リクエストが正常に実行されること(): void
    {
        //Given: アカウント作成
        $contract = $this->createContract();
        $customer = $this->createCustomer($contract->id);
        $admin = $this->createStoreAdmin($contract->id);

        $chatroom = $this->createChatroom(//チャットルーム1: 未読やメッセージが一つもないデータ
            $contract,
            [ChatroomMember::create($customer), ChatroomMember::create($admin)],
            ["chat_type" => ChatroomTypeEnum::STORE]
        );
        $expected = [
            [
                'chatroomId' => $chatroom->id,
                'contractKey' => $chatroom->contract_key,
                'chatType' => ChatroomTypeEnum::STORE->description(),
                'customerName' => $customer->full_name,
                'customerAvatarImageUrl' => $customer->avatar_image_path,
                'isProcessed' => $chatroom->is_processed,
                'isSpam' => $chatroom->is_spam,
                'lastMessage' => $chatroom->last_message,
                'lastMessageUpdatedAt' => $chatroom->last_message_updated_at?->format(DateUtil::DATE_FORMAT),
                'unreadMessageCount' => 0,
            ]
        ];
        $this->actingAs($admin, "admin");

        //When
        $response = $this->request(["contractKey" => $contract->key])->assertStatus(Response::HTTP_OK);

        //Then: レスポンスが期待通りであること(並び順やデータが一致していること)
        $responseData = $response->json()["data"];
        self::assertEquals($expected[0], $responseData[0]);
    }

    public function test_fetchChatrooms_サポートは実行できないこと(): void
    {
        //Given: アカウント作成
        $contract = $this->createContract();
        $customer = $this->createCustomer($contract->id);
        $admin = $this->createStoreAdmin($contract->id, ["role" => AdminRoleEnum::SUPPORT_ADMIN]);

        $this->actingAs($admin, "admin");

        //When
        $this->request()->assertStatus(Response::HTTP_FORBIDDEN);
    }

    /**
     * @param  array<mixed> $params
     * @return TestResponse
     */
    private function request(array $params = []): TestResponse
    {
        $params = array_merge(
            [
                "chatType" => ChatroomTypeEnum::STORE->description(),
                "filterStatus" => "",
            ],
            $params
        );
        return $this->get(route(self::ROUTE_NAME, $params));
    }

    public function test_fetchCustomer_リクエストが正常に実行されること(): void
    {
        //Given: アカウント作成
        $contract = $this->createContract();
        $customer = $this->createCustomer($contract->id);
        $admin = $this->createStoreAdmin($contract->id);

        $chatroom = $this->createChatroom(
            $contract,
            [ChatroomMember::create($customer), ChatroomMember::create($admin)],
            ["chat_type" => ChatroomTypeEnum::STORE]
        );

        $this->actingAs($admin, "admin");

        //When
        $this->get(route("admin.api.chat.customer", ["chatroom_id" => $chatroom->id]))->assertStatus(Response::HTTP_OK);
    }

    public function test_changeStatus_リクエストが正常に実行されること(): void
    {
        //Given: アカウント作成
        $contract = $this->createContract();
        $customer = $this->createCustomer($contract->id);
        $admin = $this->createStoreAdmin($contract->id);

        $chatroom = $this->createChatroom(
            $contract,
            [ChatroomMember::create($customer), ChatroomMember::create($admin)],
            ["chat_type" => ChatroomTypeEnum::STORE]
        );

        $this->actingAs($admin, "admin");
        $mock = \Mockery::mock(ChatroomSummaryRepository::class);
        /** @phpstan-ignore-next-line */
        $mock->shouldReceive("save")->once();
        app()->instance(ChatroomSummaryRepository::class, $mock);

        //When
        $this->patch(
            route(
                "admin.api.chat.changeStatus",
                ["chatroom_id" => $chatroom->id, "isOn" => true, "requestStatusType" => RequestStatusEnum::PROCESSED->value]
            )
        )->assertStatus(Response::HTTP_NO_CONTENT);
    }
}
