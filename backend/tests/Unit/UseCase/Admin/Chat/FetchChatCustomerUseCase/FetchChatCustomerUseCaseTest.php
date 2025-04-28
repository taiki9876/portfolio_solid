<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\Chat\FetchChatCustomerUseCase;

use App\Models\Chatroom\ChatroomMember;
use App\UseCase\Admin\Chat\FetchChatCustomerUseCase\FetchChatCustomerUseCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\AdminCreator;
use Tests\Helper\ChatroomCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\TestCase;

class FetchChatCustomerUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use ChatroomCreator;
    use AdminCreator;
    use CustomerCreator;

    private FetchChatCustomerUseCase $useCase;

    public function setUp(): void
    {
        parent::setUp();
        $this->useCase = resolve(FetchChatCustomerUseCase::class);
    }

    public function test_execute_チャットルーム参加者会員の情報を取得できること(): void
    {
        //Given
        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);
        $customer = $this->createCustomer($contract->id);
        $chatroom = $this->createChatroom($contract, [
            ChatroomMember::create($admin),
            ChatroomMember::create($customer),
        ]);

        //When
        $actual = $this->useCase->execute($chatroom->id);

        //Then
        self::assertEquals(
            [
                $customer->id,
                $customer->full_name,
                $customer->avatar_image_path,
                "ノーマル",
                $customer->birth_date?->format('Y-m-d'),
                $customer->age(),
                $customer->sex->description(),
                $customer->entry_at?->format('Y-m-d'),
                $customer->last_visit_at?->format('Y-m-d'),
            ],
            [
                $actual->customerId,
                $actual->customerName,
                $actual->avatarImageUrl,
                $actual->rank,
                $actual->birthday,
                $actual->age,
                $actual->gender,
                $actual->entryAt,
                $actual->lastVisitAt
            ]);
    }
}
