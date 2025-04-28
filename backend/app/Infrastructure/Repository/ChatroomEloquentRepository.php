<?php

declare(strict_types=1);

namespace App\Infrastructure\Repository;

use App\Models\Chatroom\Chatroom;
use App\Models\Chatroom\ChatroomMember;
use Carbon\CarbonImmutable;

class ChatroomEloquentRepository
{
    /**
     * @param  Chatroom $chatroom
     * @return Chatroom
     */
    public function save(Chatroom $chatroom): Chatroom
    {
        if ($chatroom->id === null) {
            $chatroom->save();
            $chatroom->members()->saveMany($chatroom->members);
        } else {
            $now = CarbonImmutable::now();
            $chatroom->updated_at = $now;
            $chatroom->update(
                $chatroom->only($chatroom->getFillable())
            );

            $members = $chatroom->members;
            $members->each(static function (ChatroomMember $member) use ($chatroom, $now) {
                if (!property_exists($member, ChatroomMember::PRIMARY_KEY)) {
                    //新規メンバー
                    $chatroom->members()->save($member);
                    return;
                }

                $member->updated_at = $now;
                $member->update($member->only($member->getFillable()));
            });
        }
        return $chatroom->load('members');
    }

    /**
     * @param  int           $id
     * @param  bool          $withMembers
     * @return Chatroom|null
     */
    public function findById(int $id, bool $withMembers = false): ?Chatroom
    {
        $with = [];
        if ($withMembers === true) {
            $with[] = 'members';
        }

        return Chatroom::query()
            ->with($with)
            ->where("id", $id)
            ->first();
    }
}
