<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\Chat\ProcessSendUseCase;

use App\Infrastructure\Repository\Firestore\ChatroomSummaryRepository;
use App\Infrastructure\Repository\Firestore\MessageRepository;
use App\Models\Chatroom\ChatroomMember;
use App\UseCase\Admin\Chat\ProcessSendUseCase\ProcessSendUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\AdminCreator;
use Tests\Helper\ChatroomCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\Helper\Mock\FirebaseMock;
use Tests\TestCase;

class ProcessSendUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use ChatroomCreator;
    use AdminCreator;
    use CustomerCreator;
    use FirebaseMock;

    public function test_execute_メッセージ送信プロセスが実行されること(): void
    {
        //Given
        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);
        $customer = $this->createCustomer($contract->id);

        $chatroom = $this->createChatroom(
            $contract,
            [
                ChatroomMember::create($admin),
                ChatroomMember::create($customer)
            ],
            ["is_processed" => 1]
        );
        self::assertDatabaseHas("chatrooms", [
            "id" => $chatroom->id,
            "is_processed" => 1,
        ]);

        $messageRepository = \Mockery::mock(MessageRepository::class)->makePartial();
        /** @phpstan-ignore-next-line */
        $messageRepository->shouldReceive("findLatestMessageByChatroom")->once()->andReturn($this->createMessage(["readBy" => [], "content" => "新しいメッセージ"]));
        app()->instance(MessageRepository::class, $messageRepository);

        $summaryRepository = \Mockery::mock(ChatroomSummaryRepository::class)->makePartial();
        /** @phpstan-ignore-next-line */
        $summaryRepository->shouldReceive("save")->once()->andReturn();
        app()->instance(ChatroomSummaryRepository::class, $summaryRepository);

        //When
        resolve(ProcessSendUseCase::class)->execute($admin, $chatroom->id);

        //Then: 未対応状態、最新メッセージが反映されていること
        self::assertDatabaseHas("chatrooms", [
            "id" => $chatroom->id,
            "is_processed" => 0,
            "last_message" => "新しいメッセージ",
            "last_message_updated_at" => now()->toDateTimeString(),
        ]);
        self::assertDatabaseHas("chatroom_members", [
            "chatroom_id" => $chatroom->id,
            "admin_id" => null,
            "customer_id" => $customer->id,
            "unread_count" => 1,
        ]);
        self::assertDatabaseHas("chatroom_members", [
            "chatroom_id" => $chatroom->id,
            "admin_id" => $admin->id,
            "customer_id" => null,
            "unread_count" => 0,
        ]);
    }
}
