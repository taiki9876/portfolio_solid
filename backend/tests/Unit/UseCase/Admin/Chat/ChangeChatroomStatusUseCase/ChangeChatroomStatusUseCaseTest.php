<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\Chat\ChangeChatroomStatusUseCase;

use App\Infrastructure\Repository\Firestore\ChatroomSummaryRepository;
use App\Models\Chatroom\ChatroomMember;
use App\UseCase\Admin\Chat\ChangeChatroomStatus\ChangeChatroomStatusInput;
use App\UseCase\Admin\Chat\ChangeChatroomStatus\ChangeChatroomStatusUseCase;
use App\UseCase\Admin\Chat\ChangeChatroomStatus\RequestStatusEnum;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\AdminCreator;
use Tests\Helper\ChatroomCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\TestCase;

class ChangeChatroomStatusUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use ChatroomCreator;
    use AdminCreator;
    use CustomerCreator;

    private ChangeChatroomStatusUseCase $useCase;

    public function setUp(): void
    {
        parent::setUp();

        $mock = \Mockery::mock(ChatroomSummaryRepository::class);
        /** @phpstan-ignore-next-line */
        $mock->shouldReceive("save")->once();
        app()->instance(ChatroomSummaryRepository::class, $mock);
        $this->useCase = resolve(ChangeChatroomStatusUseCase::class);
    }

    public function test_execute_ステータス変更できること_対応済み(): void
    {
        //Given
        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);
        $customer = $this->createCustomer($contract->id);
        $chatroom = $this->createChatroom($contract, [
            ChatroomMember::create($admin),
            ChatroomMember::create($customer),
        ]);
        self::assertDatabaseHas("chatrooms", [
            "id" => $chatroom->id,
            "is_processed" => 0,
        ]);

        $input = new ChangeChatroomStatusInput(
            RequestStatusEnum::PROCESSED->value,
            true
        );

        //When
        $actual = $this->useCase->execute($admin, $chatroom->id, $input);

        //Then
        self::assertTrue($actual);
        self::assertDatabaseHas("chatrooms", [
            "id" => $chatroom->id,
            "is_processed" => 1,
        ]);
    }

    public function test_execute_ステータス変更できること_スパム(): void
    {
        //Given
        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);
        $customer = $this->createCustomer($contract->id);
        $chatroom = $this->createChatroom($contract, [
            ChatroomMember::create($admin),
            ChatroomMember::create($customer),
        ]);
        self::assertDatabaseHas("chatrooms", [
            "id" => $chatroom->id,
            "is_spam" => 0,
        ]);

        $input = new ChangeChatroomStatusInput(
            RequestStatusEnum::SPAM->value,
            true
        );

        //When
        $actual = $this->useCase->execute($admin, $chatroom->id, $input);

        //Then
        self::assertTrue($actual);
        self::assertDatabaseHas("chatrooms", [
            "id" => $chatroom->id,
            "is_spam" => 1,
        ]);
    }
}
