<?php

declare(strict_types=1);

namespace Tests\Helper;

use App\Models\Chatroom\Chatroom;
use App\Models\Chatroom\ChatroomMember;
use App\Models\Chatroom\Message;
use App\Models\Chatroom\ValueObjects\ContentTypeEnum;
use App\Models\Chatroom\ValueObjects\MemberTypeEnum;
use App\Models\Contract\Contract;
use Carbon\CarbonImmutable;

trait ChatroomCreator
{
    /**
     * @param  Contract              $contract
     * @param  array<ChatroomMember> $chatroomMember
     * @param  array<mixed>          $overrideParams
     * @return Chatroom
     */
    public function createChatroom(
        Contract $contract,
        array $chatroomMember = [],
        array $overrideParams = [],
    ): Chatroom {
        /** @var Chatroom $chatroom */
        $chatroom = Chatroom::factory()->create(array_merge([
            "contract_key" => $contract->key,
        ], $overrideParams));

        if (count($chatroomMember) > 0) {
            foreach ($chatroomMember as $member) {
                ChatroomMember::factory()->create([
                    "chatroom_id" => $chatroom->id,
                    "admin_id" => $member->admin_id,
                    "customer_id" => $member->customer_id,
                ]);
            }
        }

        return $chatroom->load('members');
    }

    /**
     * @param  array<mixed> $overrideParams
     * @return Message
     */
    public function createMessage(array $overrideParams = []): Message
    {
        $props = array_merge(
            [
                "id" => null,
                "chatroomId" => 1,
                "content" => "新しいメッセージ",
                "contentType" => ContentTypeEnum::TEXT,
                "readAt" => null,
                "readBy" => [],
                "sendAt" => CarbonImmutable::now(),
                "senderType" => MemberTypeEnum::STAFF,
                "senderUID" => "test",
                "createdAt" => CarbonImmutable::now(),
                "updatedAt" => CarbonImmutable::now(),
            ],
            $overrideParams
        );
        return new Message(...$props);
    }
}
