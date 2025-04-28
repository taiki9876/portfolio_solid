<?php

declare(strict_types=1);

namespace App\Infrastructure\Repository\Firestore;

use App\Models\Chatroom\ValueObjects\ChatroomSummary;
use Google\Cloud\Core\Exception\NotFoundException;
use Google\Cloud\Core\Timestamp;
use Google\Cloud\Firestore\FieldValue;
use Google\Cloud\Firestore\FirestoreClient;
use Kreait\Firebase\Contract\Firestore;

/**
 * Firestore ChatroomSummary Repository
 */
class ChatroomSummaryRepository
{
    private FirestoreClient $db;

    public function __construct(
        Firestore $firestore
    ) {
        $this->db = $firestore->database();
    }

    public function save(ChatroomSummary $summary): void
    {
        $docRef = $this->db
            ->collection("{$summary->contractKey}/chat/summaries")
            ->document((string) $summary->chatroomId);

        $lastMessageUpdatedAt = $summary->lastMessageUpdatedAt === null
            ? null
            : new Timestamp($summary->lastMessageUpdatedAt);
        try {
            $docRef->update([
                ["path" => "lastMessage", "value" => $summary->lastMessage],
                ["path" => "lastMessageUpdatedAt", "value" => $lastMessageUpdatedAt],
                ["path" => "isProcessed", "value" => $summary->isProcessed],
                ["path" => "isSpam", "value" => $summary->isSpam],
                ["path" => "unreadCounts", "value" => $summary->unreadCount],
                ["path" => "updatedAt", "value" => FieldValue::serverTimestamp()],
            ]);
        } catch (NotFoundException $e) {
            // ドキュメントが存在しない場合は新規作成
            $docRef->set([
                "chatroomId" => $summary->chatroomId,
                "lastMessage" => $summary->lastMessage,
                "lastMessageUpdatedAt" => $lastMessageUpdatedAt,
                "isProcessed" => $summary->isProcessed,
                "isSpam" => $summary->isSpam,
                "unreadCounts" => $summary->unreadCount,
                "createdAt" => FieldValue::serverTimestamp(),
                "updatedAt" => FieldValue::serverTimestamp(),
            ]);
        }
    }
}
