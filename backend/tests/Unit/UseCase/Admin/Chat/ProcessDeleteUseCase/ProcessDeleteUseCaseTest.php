<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\Chat\ProcessDeleteUseCase;

use App\Infrastructure\Repository\ChatroomEloquentRepository;
use App\Infrastructure\Repository\Firestore\ChatroomSummaryRepository;
use App\Infrastructure\Repository\Firestore\MessageRepository;
use App\Models\Chatroom\Chatroom;
use App\Models\Chatroom\ChatroomMember;
use App\Models\Chatroom\ValueObjects\MemberTypeEnum;
use App\UseCase\Admin\Chat\ProcessDeleteUseCase\ProcessDeleteInput;
use App\UseCase\Admin\Chat\ProcessDeleteUseCase\ProcessDeleteUseCase;
use Carbon\CarbonImmutable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Tests\Helper\AdminCreator;
use Tests\Helper\ChatroomCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\TestCase;

class ProcessDeleteUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use ChatroomCreator;
    use AdminCreator;
    use CustomerCreator;

    public function test_execute_何も更新されないケース(): void
    {
        //Given 削除されたメッセージが、「最新メッセージでない、かつ、会員既読済みの場合」何もしない
        $messageRepositoryMock = Mockery::mock(MessageRepository::class);
        /** @phpstan-ignore-next-line */
        $messageRepositoryMock->shouldReceive("findLatestMessageByChatroom")->never()->andReturn(null);
        app()->instance(MessageRepository::class, $messageRepositoryMock);

        $chatroomRepositoryMock = Mockery::mock(ChatroomEloquentRepository::class)->makePartial();
        /** @phpstan-ignore-next-line */
        $chatroomRepositoryMock->shouldReceive("save")->never()->andReturn(null);
        app()->instance(ChatroomEloquentRepository::class, $chatroomRepositoryMock);

        $summaryRepositoryMock = Mockery::mock(ChatroomSummaryRepository::class);
        /** @phpstan-ignore-next-line */
        $summaryRepositoryMock->shouldReceive("save")->never()->andReturn(null);
        app()->instance(ChatroomSummaryRepository::class, $summaryRepositoryMock);

        $chatroom = $this->createDummyChatroom();

        //When
        $isChanged = resolve(ProcessDeleteUseCase::class)->execute(
            $chatroom->id,
            new ProcessDeleteInput(false, false)
        );

        //Then
        self::assertFalse($isChanged);
    }

    public function test_execute_最新メッセージが削除されたケース(): void
    {
        //Given
        $messageRepositoryMock = Mockery::mock(MessageRepository::class);
        /** @phpstan-ignore-next-line */
        $messageRepositoryMock->shouldReceive("findLatestMessageByChatroom")->once()->andReturn(null);
        app()->instance(MessageRepository::class, $messageRepositoryMock);

        $summaryRepositoryMock = Mockery::mock(ChatroomSummaryRepository::class);
        /** @phpstan-ignore-next-line */
        $summaryRepositoryMock->shouldReceive("save")->once()->andReturn(null);
        app()->instance(ChatroomSummaryRepository::class, $summaryRepositoryMock);

        $chatroom = $this->createDummyChatroom();
        $chatroom->newMessage(MemberTypeEnum::CUSTOMER, "test message");
        $this->saveChatroom($chatroom);
        self::assertDatabaseHas("chatrooms", [
            "id" => $chatroom->id,
            "last_message" => "test message",
            "last_message_updated_at" => CarbonImmutable::now(),
        ]);

        //When
        $isChanged = resolve(ProcessDeleteUseCase::class)->execute(
            $chatroom->id,
            new ProcessDeleteInput(true, false)
        );

        //Then: 最新メッセージが削除されたので、最終メッセージ情報も更新されていること
        self::assertTrue($isChanged);
        self::assertDatabaseHas("chatrooms", [
            "id" => $chatroom->id,
            "last_message" => null,
            "last_message_updated_at" => null,
        ]);
    }

    public function test_execute_会員が未読のメッセージを削除したケース_未読をデクリメントすること(): void
    {
        //Given
        $messageRepositoryMock = Mockery::mock(MessageRepository::class);
        /** @phpstan-ignore-next-line */
        $messageRepositoryMock->shouldReceive("findLatestMessageByChatroom")->never()->andReturn(null);
        app()->instance(MessageRepository::class, $messageRepositoryMock);

        $summaryRepositoryMock = Mockery::mock(ChatroomSummaryRepository::class);
        /** @phpstan-ignore-next-line */
        $summaryRepositoryMock->shouldReceive("save")->once()->andReturn(null);
        app()->instance(ChatroomSummaryRepository::class, $summaryRepositoryMock);

        $chatroom = $this->createDummyChatroom();
        $chatroom->newMessage(MemberTypeEnum::STAFF, "test message");
        $chatroom->newMessage(MemberTypeEnum::STAFF, "test message");
        $customer = $chatroom->members->first(static fn (ChatroomMember $member) => $member->memberType()->is(MemberTypeEnum::CUSTOMER));
        $this->saveChatroom($chatroom);
        self::assertDatabaseHas("chatroom_members", [
            "customer_id" => $customer?->memberId(),
            "unread_count" => 2,
        ]);

        //When
        $isChanged = resolve(ProcessDeleteUseCase::class)->execute(
            $chatroom->id,
            new ProcessDeleteInput(false, true)
        );

        //Then: 会員の未読数がデクリメントされていること
        self::assertTrue($isChanged);
        self::assertDatabaseHas("chatroom_members", [
            "customer_id" => $customer?->memberId(),
            "unread_count" => 1,
        ]);
    }

    private function createDummyChatroom(): Chatroom
    {
        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);
        $customer = $this->createCustomer($contract->id);
        return $this->createChatroom($contract, [
            ChatroomMember::create($admin),
            ChatroomMember::create($customer),
        ]);
    }

    private function saveChatroom(Chatroom $chatroom): void
    {
        resolve(ChatroomEloquentRepository::class)->save($chatroom);
    }
}
