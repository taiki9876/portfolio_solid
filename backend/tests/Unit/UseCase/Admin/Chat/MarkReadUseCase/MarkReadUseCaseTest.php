<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\Chat\MarkReadUseCase;

use App\Infrastructure\Repository\ChatroomEloquentRepository;
use App\Infrastructure\Repository\Firestore\ChatroomSummaryRepository;
use App\Models\Chatroom\ChatroomMember;
use App\Models\Chatroom\ValueObjects\MemberTypeEnum;
use App\UseCase\Admin\Chat\MarkReadUseCase\MarkReadUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\AdminCreator;
use Tests\Helper\ChatroomCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\TestCase;

class MarkReadUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use ChatroomCreator;
    use AdminCreator;
    use CustomerCreator;

    private MarkReadUseCase $useCase;

    public function setUp(): void
    {
        parent::setUp();

        $mock = \Mockery::mock(ChatroomSummaryRepository::class);
        /** @phpstan-ignore-next-line */
        $mock->shouldReceive("save")->once();
        app()->instance(ChatroomSummaryRepository::class, $mock);
        $this->useCase = resolve(MarkReadUseCase::class);
    }

    public function test_execute_既読処理ができること(): void
    {
        //Given
        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);
        $admin2 = $this->createStoreAdmin($contract->id);
        $customer = $this->createCustomer($contract->id);
        $chatroom = $this->createChatroom($contract, [
            ChatroomMember::create($admin),
            ChatroomMember::create($admin2),
            ChatroomMember::create($customer),
        ]);

        //未読がある状態を作成する
        $chatroom->newMessage(MemberTypeEnum::CUSTOMER, "test message");
        resolve(ChatroomEloquentRepository::class)->save($chatroom);
        self::assertDatabaseHas("chatroom_members", [
            "chatroom_id" => $chatroom->id,
            "admin_id" => $admin->id,
            "unread_count" => 1,
        ]);
        self::assertDatabaseHas("chatroom_members", [
            "chatroom_id" => $chatroom->id,
            "admin_id" => $admin2->id,
            "unread_count" => 1,
        ]);

        //When
        $this->useCase->execute($admin, $chatroom->id);

        //Then
        self::assertDatabaseHas("chatroom_members", [
            "chatroom_id" => $chatroom->id,
            "admin_id" => $admin->id,
            "unread_count" => 0,
        ]);
        //他のメンバーの未読数は変わらない
        self::assertDatabaseHas("chatroom_members", [
            "chatroom_id" => $chatroom->id,
            "admin_id" => $admin2->id,
            "unread_count" => 1,
        ]);
    }
}
