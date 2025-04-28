<?php

declare(strict_types=1);

namespace Tests\Unit\Models\Chatroom;

use App\Models\Chatroom\Chatroom;
use App\Models\Chatroom\ChatroomMember;
use App\Models\Chatroom\ValueObjects\MemberTypeEnum;
use Carbon\CarbonImmutable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function PHPUnit\Framework\assertEquals;
use Tests\Helper\AdminCreator;
use Tests\Helper\ChatroomCreator;
use Tests\Helper\ContractCreator;
use Tests\Helper\CustomerCreator;
use Tests\TestCase;

class ChatroomTest extends TestCase
{
    use RefreshDatabase;
    use ContractCreator;
    use CustomerCreator;
    use AdminCreator;
    use ChatroomCreator;

    public function test_members_メンバーを取得できること(): void
    {
        //Given
        $adminMemberCount = 2;
        $chatroom = $this->createDummyChatroom($adminMemberCount);

        //When
        $members = $chatroom->members;

        //Then 管理者と会員の合計
        self::assertCount($adminMemberCount + 1, $members);
    }

    public function test_getMemberFrom_指定したアカウントのChatroomMemberインスタンスを取得できること(): void
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
        $customerAsMember = $chatroom->getMemberFrom($customer);
        $adminAsMember = $chatroom->getMemberFrom($admin);

        //Then
        self::assertEquals($customer->id, $customerAsMember->memberId());
        self::assertEquals($admin->id, $adminAsMember->memberId());
    }

    public function test_setLastMessage_最終メッセージを更新できること(): void
    {
        //Given
        $chatroom = $this->createDummyChatroom();
        self::assertNull($chatroom->last_message);
        self::assertNull($chatroom->last_message_updated_at);

        //When：昨日のメッセージを送信
        $message = $this->createMessage(["content" => "dummy content", "sendAt" => CarbonImmutable::yesterday()]);
        $chatroom->setLastMessage($message);
        //Then
        self::assertEquals("dummy content", $chatroom->last_message);
        self::assertEquals(CarbonImmutable::yesterday(), $chatroom->last_message_updated_at);

        //When：メッセージがない場合
        $chatroom->setLastMessage(null);
        //Then
        self::assertNull($chatroom->last_message);
        self::assertNull($chatroom->last_message_updated_at);
    }

    public function test_decrementUnreadCount_未読件数をデクリメントできること(): void
    {
        // Given
        $chatroom = $this->createDummyChatroom();
        $chatroom->newMessage(MemberTypeEnum::STAFF, "test message");// 会員の未読を2件増加
        $chatroom->newMessage(MemberTypeEnum::STAFF, "test message");
        $customer = $chatroom->members->first(static fn (ChatroomMember $m) => $m->memberType()->is(MemberTypeEnum::CUSTOMER));
        assertEquals(2, $customer?->unread_count);

        // When
        $chatroom->decrementUnreadCount(MemberTypeEnum::CUSTOMER);

        //Then
        assertEquals(1, $customer?->unread_count);
    }

    public function test_summary_未読件数や最新メッセージなどの情報を取得できること(): void
    {
        //Given
        $contract = $this->createContract();
        $admin = $this->createStoreAdmin($contract->id);
        $customer = $this->createCustomer($contract->id);
        $chatroom = $this->createChatroom($contract, [
            ChatroomMember::create($admin),
            ChatroomMember::create($customer),
        ]);
        $chatroom->newMessage(MemberTypeEnum::STAFF, "新しいメッセージ----");

        //When
        $summary = $chatroom->summary();
        self::assertEquals($contract->key, $summary->contractKey);
        self::assertEquals($chatroom->id, $summary->chatroomId);
        self::assertEquals(
            [
                "customer_{$customer->id}" => 1,
                MemberTypeEnum::STAFF->value . "_{$admin->id}" => 0,
            ],
            $summary->unreadCount
        );
        self::assertEquals("新しいメッセージ----", $summary->lastMessage);
    }

    public function test_newMessage_最新のメッセージの更新と受信者の未読件数を増加できること(): void
    {
        //Given
        $chatroom = $this->createDummyChatroom();
        $chatroom->markProcessed(MemberTypeEnum::STAFF, isOn: true);
        //Given 現在の状態確認
        self::assertNull($chatroom->last_message);
        self::assertNull($chatroom->last_message_updated_at);
        self::assertTrue($chatroom->is_processed);

        //When 会員から2通メッセージがあったと仮定
        $chatroom->newMessage(MemberTypeEnum::CUSTOMER, "test message");
        $chatroom->newMessage(MemberTypeEnum::CUSTOMER, "test message");

        //Then: 未読件数が増加していること
        $chatroom->members->each(static function (ChatroomMember $member) {
            if ($member->memberType()->is(MemberTypeEnum::STAFF)) {
                self::assertEquals(2, $member->unread_count);
            } else {
                self::assertEquals(0, $member->unread_count);
            }
        });

        //When そのあと管理者から1通メッセージがあったと仮定
        $chatroom->newMessage(MemberTypeEnum::STAFF, "test message");

        //Then 会員側の未読件数が増加していること
        self::assertEquals("test message", $chatroom->last_message);
        self::assertEquals(CarbonImmutable::now(), $chatroom->last_message_updated_at);
        self::assertFalse($chatroom->is_processed, "未処理状態になっていること");
        $chatroom->members->each(static function (ChatroomMember $member) {
            if ($member->memberType()->is(MemberTypeEnum::STAFF)) {
                self::assertEquals(2, $member->unread_count);//既読はつけていないのでそのまま未読状態
            } else {
                self::assertEquals(1, $member->unread_count);
            }
        });
    }

    public function test_newMessage_スパム会員からのメッセージは受け付けないこと(): void
    {
        $this->expectException(\DomainException::class);
        $chatroom = $this->createDummyChatroom();
        $chatroom->markSpam(MemberTypeEnum::STAFF, isOn: true);

        $chatroom->newMessage(MemberTypeEnum::CUSTOMER, "test message");
    }

    public function test_newMessage_すでに既読済みのメンバーは未読件数が増加しないこと(): void
    {
        //Given
        $contract = $this->createContract();
        $admin = ChatroomMember::create($this->createStoreAdmin($contract->id));//増加しない想定
        $admin2 = ChatroomMember::create($this->createStoreAdmin($contract->id));//増加する想定
        $customer = ChatroomMember::create($this->createCustomer($contract->id));//送信者
        $chatroom = $this->createChatroom($contract, [$admin, $admin2, $customer]);

        //When
        $chatroom->newMessage(
            messageSenderType: $customer->memberType(),
            newMessage: "test message",
            alreadyReadBy: [$admin->typePrefixId()]
        );

        //Then
        $chatroom->members->each(static function (ChatroomMember $member) use ($admin, $admin2) {
            if ($member->memberId() === $admin->memberId()) {
                self::assertEquals(0, $member->unread_count);
            } elseif ($member->memberId() === $admin2->memberId()) {
                self::assertEquals(1, $member->unread_count);
            }
        });
    }

    public function test_markAsRead_特定メンバーの未読をリセットすること(): void
    {
        //Given
        $chatroom = $this->createDummyChatroom();
        $chatroom->newMessage(MemberTypeEnum::CUSTOMER, "test message");// 会員の未読を1件増加
        $chatroom->newMessage(MemberTypeEnum::CUSTOMER, "test message");// 管理者全員の未読を2件増加
        $chatroom->newMessage(MemberTypeEnum::STAFF, "test message");// 会員の未読を1件増加

        /** @var ChatroomMember $targetMember */
        $targetMember = $chatroom->members->filter(
            static fn (ChatroomMember $m) => $m->memberType()->is(MemberTypeEnum::STAFF)
        )->first();

        //When
        $chatroom->markAsRead($targetMember);

        //Then
        $chatroom->members->each(static function (ChatroomMember $member) use ($targetMember) {
            if ($member->admin_id === $targetMember->admin_id && $member->memberType()->is($targetMember->memberType())) {
                self::assertEquals(0, $member->unread_count);//Then 未読リセットされていること
            } elseif ($member->memberType()->is(MemberTypeEnum::CUSTOMER)) {
                self::assertEquals(1, $member->unread_count);//Then 会員の未読は1件のまま
            } else {
                self::assertEquals(2, $member->unread_count);//Then 既読対象以外の管理者の未読は2件のままであること
            }
        });
    }

    public function test_markSpam_スパムフラグをつけられること(): void
    {
        $chatroom = $this->createDummyChatroom();
        $chatroom->markSpam(MemberTypeEnum::STAFF, isOn: true);
        self::assertTrue($chatroom->is_spam);

        $chatroom->markSpam(MemberTypeEnum::STAFF, isOn: false);
        self::assertFalse($chatroom->is_spam);

        $this->expectException(\DomainException::class);//会員はスパムをつけられない
        $chatroom->markSpam(MemberTypeEnum::CUSTOMER, isOn: true);
    }

    public function test_markProcessed_対応済みフラグをつけられること(): void
    {
        $chatroom = $this->createDummyChatroom();
        $chatroom->markProcessed(MemberTypeEnum::STAFF, isOn: true);
        self::assertTrue($chatroom->is_processed);

        $chatroom->markProcessed(MemberTypeEnum::STAFF, isOn: false);
        self::assertFalse($chatroom->is_processed);

        $chatroom->markSpam(MemberTypeEnum::STAFF, isOn: true);
        $this->expectException(\DomainException::class);//スパムの場合は対応済み変更できない
        $chatroom->markProcessed(MemberTypeEnum::STAFF, isOn: true);
    }

    private function createDummyChatroom(int $adminMemberCount = 2): Chatroom
    {
        $contract = $this->createContract();
        $members = [ChatroomMember::create($this->createCustomer($contract->id))];

        for ($i = 0; $i < $adminMemberCount; $i++) {
            $members[] = ChatroomMember::create($this->createStoreAdmin($contract->id));
        }

        return $this->createChatroom($contract, $members);
    }
}
