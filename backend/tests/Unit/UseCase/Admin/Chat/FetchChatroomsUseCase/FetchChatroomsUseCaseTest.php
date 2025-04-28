<?php

declare(strict_types=1);

namespace Tests\Unit\UseCase\Admin\Chat\FetchChatroomsUseCase;

use App\Infrastructure\Repository\ChatroomEloquentRepository;
use App\Models\Admin\Admin;
use App\Models\Chatroom\ChatroomMember;
use App\Models\Chatroom\ValueObjects\ChatroomTypeEnum;
use App\Models\Contract\Contract;
use App\UseCase\Admin\Chat\FetchChatroomsUseCase\FetchChatroomsInput;
use App\UseCase\Admin\Chat\FetchChatroomsUseCase\FetchChatroomsUseCase;
use App\UseCase\Admin\Chat\FetchChatroomsUseCase\FilterStatusParamEnum;
use App\Util\DateUtil;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helper\AdminCreator;
use Tests\Helper\ChatroomCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\TestCase;

class FetchChatroomsUseCaseTest extends TestCase
{
    use RefreshDatabase;
    use AdminCreator;
    use ContractCreator;
    use CustomerCreator;
    use ChatroomCreator;

    private FetchChatroomsUseCase $useCase;

    public function setUp(): void
    {
        parent::setUp();
        $this->useCase = resolve(FetchChatroomsUseCase::class);
    }

    public function test_execute_所属するチャットルームを取得できること(): void
    {
        //Given
        $contract = $this->createContract();
        $customer = $this->createCustomer($contract->id);
        $admin = $this->createStoreAdmin($contract->id);

        $chatroom1 = $this->createChatroom(
            $contract,
            [ChatroomMember::create($customer), ChatroomMember::create($admin)],
            ["chat_type" => ChatroomTypeEnum::STORE]
        );
        $chatroom2 = $this->createChatroom(
            $contract,
            [ChatroomMember::create($customer), ChatroomMember::create($admin)],
            ["chat_type" => ChatroomTypeEnum::STORE]
        );
        $chatroom2->newMessage(ChatroomMember::create($customer)->memberType(), "test message");
        resolve(ChatroomEloquentRepository::class)->save($chatroom2);

        $otherAdmin = $this->createStoreAdmin($contract->id);// 他の管理者
        $this->createChatroom(//取得されない想定のチャットルーム
            $contract,
            [ChatroomMember::create($customer), ChatroomMember::create($otherAdmin)],
            ["chat_type" => ChatroomTypeEnum::STORE]
        );

        $expected = [
            [
                'chatroomId' => $chatroom2->id,
                'contractKey' => $chatroom2->contract_key,
                'chatType' => ChatroomTypeEnum::STORE->description(),
                'customerName' => $customer->full_name,
                'customerAvatarImageUrl' => $customer->avatar_image_path,
                'isProcessed' => $chatroom2->is_processed,
                'isSpam' => $chatroom2->is_spam,
                'lastMessage' => $chatroom2->last_message,
                'lastMessageUpdatedAt' => $chatroom2->last_message_updated_at?->format(DateUtil::DATE_FORMAT),
                'unreadMessageCount' => 1,
            ],
            [
                'chatroomId' => $chatroom1->id,
                'contractKey' => $chatroom2->contract_key,
                'chatType' => ChatroomTypeEnum::STORE->description(),
                'customerName' => $customer->full_name,
                'customerAvatarImageUrl' => $customer->avatar_image_path,
                'isProcessed' => $chatroom1->is_processed,
                'isSpam' => $chatroom1->is_spam,
                'lastMessage' => $chatroom1->last_message,
                'lastMessageUpdatedAt' => $chatroom1->last_message_updated_at?->format(DateUtil::DATE_FORMAT),
                'unreadMessageCount' => 0,
            ]
        ];

        //When
        $output = $this->useCase->execute($admin, $this->validInput(["contractKey" => $contract->key]));

        //Then 並び順や取得データが期待通りであること
        self::assertCount(2, $output->value);
        self::assertEquals($expected[0], $output->value[0]);
        self::assertEquals($expected[1], $output->value[1]);
    }

    public function test_execute_絞り込み検索できること(): void
    {
        //Given: それぞれのチャットルームを作成する
        $resource = $this->createAllStatus("山下　チャーリー john 太郎", "田中　士郎");

        //NOTE: 検索条件のデフォルト値はvalidInputを参照
        $testcase = [
            [1, ["chatType" => ChatroomTypeEnum::STAFF->description(), "filterStatus" => FilterStatusParamEnum::ALL->value]],
            [0, ["chatType" => ChatroomTypeEnum::STAFF->description(), "filterStatus" => FilterStatusParamEnum::SPAM->value]],
            [0, ["chatType" => ChatroomTypeEnum::STAFF->description(), "filterStatus" => FilterStatusParamEnum::PROCESSED->value]],
            [0, ["chatType" => ChatroomTypeEnum::STAFF->description(), "filterStatus" => FilterStatusParamEnum::PENDING->value]],
            [0, ["chatType" => ChatroomTypeEnum::STAFF->description(), "filterStatus" => FilterStatusParamEnum::UNREAD->value]],
            [5, ["chatType" => ChatroomTypeEnum::STORE->description(), "filterStatus" => FilterStatusParamEnum::ALL->value]],
            [2, ["chatType" => ChatroomTypeEnum::STORE->description(), "filterStatus" => FilterStatusParamEnum::SPAM->value]],
            [2, ["chatType" => ChatroomTypeEnum::STORE->description(), "filterStatus" => FilterStatusParamEnum::PROCESSED->value]],
            [1, ["chatType" => ChatroomTypeEnum::STORE->description(), "filterStatus" => FilterStatusParamEnum::PENDING->value]],
            [1, ["chatType" => ChatroomTypeEnum::STORE->description(), "filterStatus" => FilterStatusParamEnum::UNREAD->value]],
//            //以下は氏名検索との併用
            [5, ["name" => ""]],
            [5, ["name" => "  　"]],
            [3, ["name" => "山下"]],
            [3, ["name" => "john"]],
            [3, ["name" => "太郎"]],
            [3, ["name" => "山下　チャーリー john 太郎"]],
            [2, ["name" => "田中"]],
            [0, ["name" => "　　 士郎"]],
            [0, ["chatType" => ChatroomTypeEnum::STORE->description(), "name" => "山下", "filterStatus" => FilterStatusParamEnum::UNREAD->value]],
            [1, ["chatType" => ChatroomTypeEnum::STORE->description(), "name" => "田中", "filterStatus" => FilterStatusParamEnum::PENDING->value]],
            [0, ["chatType" => ChatroomTypeEnum::STAFF->description(), "name" => "田中", "filterStatus" => FilterStatusParamEnum::PENDING->value]],
        ];
        foreach ($testcase as $params) {
            //When
            $output = resolve(FetchChatroomsUseCase::class)->execute(
                $resource["admin"],
                $this->validInput([...$params[1], "contractKey" => $resource["contract"]->key])
            );

            //Then
            self::assertCount($params[0], $output->value);
        }
    }

    /**
     * @return array{
     *     admin: Admin,
     *     contract: Contract
     * }
     * @throws \Exception
     */
    private function createAllStatus(string $customer1Name, string $customer2Name): array
    {
        $contract = $this->createContract();
        $customer1 = $this->createCustomer($contract->id, ["full_name" => $customer1Name]);
        $customer2 = $this->createCustomer($contract->id, ["full_name" => $customer2Name]);
        $admin = $this->createStoreAdmin($contract->id);

        $this->createChatroom(//店舗 + 未対応 + 会員1
            $contract,
            [ChatroomMember::create($customer1), ChatroomMember::create($admin)],
            ["chat_type" => ChatroomTypeEnum::STORE, "is_spam" => false, "is_processed" => false]
        );
        $this->createChatroom(//個人（スタッフ）チャット + 会員1
            $contract,
            [ChatroomMember::create($customer1), ChatroomMember::create($admin)],
            ["chat_type" => ChatroomTypeEnum::STAFF, "is_spam" => false, "is_processed" => false]
        );
        $this->createChatroom(//店舗 + スパム + 会員1
            $contract,
            [ChatroomMember::create($customer1), ChatroomMember::create($admin)],
            ["chat_type" => ChatroomTypeEnum::STORE, "is_spam" => true, "is_processed" => false]
        );
        $this->createChatroom(//店舗 + 対応済み + 会員1
            $contract,
            [ChatroomMember::create($customer1), ChatroomMember::create($admin)],
            ["chat_type" => ChatroomTypeEnum::STORE, "is_spam" => false, "is_processed" => true]
        );
        $this->createChatroom(//店舗 + 対応済みかつスパム(これはスパムとして扱われること) + 会員2
            $contract,
            [ChatroomMember::create($customer2), ChatroomMember::create($admin)],
            ["chat_type" => ChatroomTypeEnum::STORE, "is_spam" => true, "is_processed" => true]
        );
        $chatroom = $this->createChatroom(//店舗 + 未読あり + 会員2
            $contract,
            [ChatroomMember::create($customer2), ChatroomMember::create($admin)],
            ["chat_type" => ChatroomTypeEnum::STORE, "is_spam" => false, "is_processed" => false]
        );
        $chatroom->newMessage(ChatroomMember::create($customer2)->memberType(), "test message");
        resolve(ChatroomEloquentRepository::class)->save($chatroom);

        $this->createChatroom(//削除された想定のチャットルーム（常に取得されないこと）
            $contract,
            [ChatroomMember::create($customer2), ChatroomMember::create($admin)],
            ["deleted_at" => now()]
        );

        return [
            "admin" => $admin,
            "contract" => $contract,
        ];
    }

    /**
     * @param array{
     *     chatType?: string,
     *     filterStatus?: string,
     *     name?: string,
     *     contractKey?: string,
     * } $override
     * @return FetchChatroomsInput
     */
    private function validInput(array $override = []): FetchChatroomsInput
    {
        $request = [
            'chatType' => ChatroomTypeEnum::STORE->description(),
            'filterStatus' => FilterStatusParamEnum::ALL->value,
            'name' => null,
            'page' => "1",
            'contractKey' => "",
            ...$override,
        ];
        return new FetchChatroomsInput(...$request);
    }
}
