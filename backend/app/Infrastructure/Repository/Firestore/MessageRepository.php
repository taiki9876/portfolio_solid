<?php

declare(strict_types=1);

namespace App\Infrastructure\Repository\Firestore;

use App\Models\Chatroom\Chatroom;
use App\Models\Chatroom\Message;
use App\Models\Chatroom\ValueObjects\ContentTypeEnum;
use Google\Cloud\Firestore\FirestoreClient;
use Kreait\Firebase\Contract\Firestore;

class MessageRepository
{
    private FirestoreClient $db;

    public function __construct(
        Firestore $firestore
    ) {
        $this->db = $firestore->database();
    }

    /**
     * @param  Chatroom     $chatroom
     * @return Message|null
     */
    public function findLatestMessageByChatroom(Chatroom $chatroom): ?Message
    {
        $querySnapshot = $this->db
            ->collection("{$chatroom->contract_key}/chat/messages")
            ->where('chatroomId', '==', $chatroom->id)
            ->orderBy('sendAt', 'desc')
            ->where("deletedAt", "==", null)
            ->where("contentType", "!=", ContentTypeEnum::PROCESSED->value)
            ->limit(1)
            ->documents();

        if ($querySnapshot->size() === 0) {
            return null;
        }

        $snapshot = $querySnapshot->rows()[0];
        return Message::fromDocSnapshot($snapshot);
    }
}
