<?php

declare(strict_types=1);

namespace Tests\Feature\Infrastructure\Repository;

use App\Infrastructure\Repository\ChatroomEloquentRepository;
use App\Models\Chatroom\Chatroom;
use App\Models\Chatroom\ChatroomMember;
use App\Models\Chatroom\ValueObjects\ChatroomTypeEnum;
use App\Models\Chatroom\ValueObjects\MemberTypeEnum;
use Carbon\CarbonImmutable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\AdminCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\TestCase;

class ChatroomEloquentRepositoryTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use AdminCreator;
    use CustomerCreator;

    private ChatroomEloquentRepository $repository;

    public function setUp(): void
    {
        parent::setUp();
        $this->repository = new ChatroomEloquentRepository();
    }

    public function test_save_新規保存と更新ができること(): void
    {
        //Given
        $contract = $this->createContract();
        $customer = $this->createCustomer($contract->id);
        $admin = $this->createStoreAdmin($contract->id);

        $chatroom = Chatroom::create($contract, ChatroomTypeEnum::STORE, [
            ChatroomMember::create($customer),
            ChatroomMember::create($admin),
        ]);

        //When 新規保存
        $chatroom = $this->repository->save($chatroom);//Then: 新規保存できること
        self::assertDatabaseHas("chatrooms", [//THEN: チャットルームが保存されていること
            "id" => $chatroom->id,
            "contract_key" => $contract->key,
            "is_processed" => false,
            "is_spam" => false,
            "chat_type" => ChatroomTypeEnum::STORE,
            "last_message" => null,
            "last_message_updated_at" => null,
        ]);
        self::assertDatabaseHas("chatroom_members", [//THEN: チャットルームメンバーが保存されていること
            "chatroom_id" => $chatroom->id,
            "customer_id" => $customer->id,
            "unread_count" => 0,
        ]);
        self::assertDatabaseHas("chatroom_members", [//THEN: チャットルームメンバーが保存されていること
            "chatroom_id" => $chatroom->id,
            "admin_id" => $admin->id,
            "unread_count" => 0,
        ]);

        //When 更新
        $newMember = $this->createStoreAdmin($contract->id);
        $chatroom->addMember(ChatroomMember::create($newMember));
        $chatroom->newMessage(MemberTypeEnum::CUSTOMER, "test message");
        $chatroom->deleted_at = CarbonImmutable::now();//検証のために直接指定（アプリケーションコードではNG）

        $this->repository->save($chatroom);//Then: 更新できること
        self::assertDatabaseHas("chatrooms", [
            "id" => $chatroom->id,
            "contract_key" => $contract->key,
            "is_processed" => false,
            "is_spam" => false,
            "chat_type" => ChatroomTypeEnum::STORE,
            "last_message" => "test message",
            "last_message_updated_at" => CarbonImmutable::now(),
            "deleted_at" => CarbonImmutable::now(),
        ]);
        self::assertDatabaseHas("chatroom_members", [//THEN: チャットルームメンバー情報も更新されていること
            "chatroom_id" => $chatroom->id,
            "customer_id" => $customer->id,
            "unread_count" => 0,
        ]);
        self::assertDatabaseHas("chatroom_members", [//THEN: チャットルームメンバー情報も更新されていること
            "chatroom_id" => $chatroom->id,
            "admin_id" => $admin->id,
            "unread_count" => 1,
        ]);
        self::assertDatabaseHas("chatroom_members", [//THEN: 新メンバーが追加されていること
            "chatroom_id" => $chatroom->id,
            "admin_id" => $newMember->id,
            "unread_count" => 1,
        ]);
    }

    public function test_findById_ID検索できること(): void
    {
        //Given
        $contract = $this->createContract();
        $customer = $this->createCustomer($contract->id);
        $admin = $this->createStoreAdmin($contract->id);

        $this->repository->save(
            $chatroom = Chatroom::create($contract, ChatroomTypeEnum::STORE, [
                ChatroomMember::create($customer),
                ChatroomMember::create($admin),
            ])
        );

        //When
        $actual = $this->repository->findById($chatroom->id);

        //Then
        self::assertNotNull($actual);
        self::assertEquals($chatroom->id, $actual->id);
    }
}
