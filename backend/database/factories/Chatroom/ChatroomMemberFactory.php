<?php

declare(strict_types=1);

namespace Database\Factories\Chatroom;

use App\Models\Chatroom\ChatroomMember;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<ChatroomMember>
 */
class ChatroomMemberFactory extends Factory
{
    public function definition(): array
    {
        return [
            "chatroom_id" => null,//必須
            "admin_id" => null,//admin_idかcustomer_idどちらか必須
            "customer_id" => null,//admin_idかcustomer_idどちらか必須
            "unread_count" => 0,
            "created_at" => now(),
            "updated_at" => now(),
            "deleted_at" => null,
        ];
    }
}
