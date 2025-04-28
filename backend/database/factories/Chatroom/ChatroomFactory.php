<?php

declare(strict_types=1);

namespace Database\Factories\Chatroom;

use App\Models\Chatroom\Chatroom;
use App\Models\Chatroom\ValueObjects\ChatroomTypeEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<Chatroom>
 */
class ChatroomFactory extends Factory
{
    public function definition(): array
    {
        return [
            "contract_key" => null,//必須
            "is_processed" => false,
            "is_spam" => false,
            "chat_type" => ChatroomTypeEnum::STORE,
            "last_message" => null,
            "last_message_updated_at" => null,
            "created_at" => now(),
            "updated_at" => now(),
            "deleted_at" => null,
        ];
    }
}
