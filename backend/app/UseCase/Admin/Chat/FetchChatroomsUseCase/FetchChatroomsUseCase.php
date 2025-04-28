<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\FetchChatroomsUseCase;

use App\Models\Admin\Admin;
use App\Models\Shared\Pagination\PerPageEnum;
use App\Util\DateUtil;
use Illuminate\Contracts\Pagination\LengthAwarePaginator as Paginator;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use stdClass;

class FetchChatroomsUseCase
{
    private const PER_PAGE = PerPageEnum::PER_PAGE_50->value;

    public function __construct(
        private readonly FetchChatroomsOutput $output,
    ) {
    }

    public function execute(Admin $admin, FetchChatroomsInput $input): FetchChatroomsOutput
    {
        /** @var LengthAwarePaginator<stdClass> $result */
        $result = $this->query($admin, $input);

        $this->output->hasMore = $result->hasMorePages();

        $result->collect()->map(function (stdClass $chatroom) {
            $this->output->add(
                $chatroom->chatroom_id,
                $chatroom->contract_key,
                $chatroom->chat_type,
                $chatroom->customer_name,
                $chatroom->customer_avatar_image_url,
                (bool)$chatroom->is_processed,
                (bool)$chatroom->is_spam,
                $chatroom->last_message,
                DateUtil::nullableCarbon($chatroom->last_message_updated_at),
                $chatroom->unread_message_count,
            );
        });

        return $this->output;
    }

    /**
     * @param  Admin               $admin
     * @param  FetchChatroomsInput $input
     * @return Paginator<stdClass>
     */
    private function query(Admin $admin, FetchChatroomsInput $input): Paginator
    {
        $query = DB::table('chatroom_members as current_admin')
            ->select(
                'c.id as chatroom_id',
                'c.contract_key as contract_key',
                'c.chat_type as chat_type',
                'cu.full_name as customer_name',
                'cu.avatar_image_path as customer_avatar_image_url',
                'c.is_processed as is_processed',
                'c.is_spam as is_spam',
                'c.last_message as last_message',
                'c.last_message_updated_at as last_message_updated_at',
                'current_admin.unread_count as unread_message_count'
            )
            ->join('chatrooms as c', 'current_admin.chatroom_id', '=', 'c.id')
            ->join('chatroom_members as cm_customer', static function ($join) {
                $join->on('current_admin.chatroom_id', '=', 'cm_customer.chatroom_id')
                    ->whereNotNull('cm_customer.customer_id');
            })
            ->join('customers as cu', 'cm_customer.customer_id', '=', 'cu.id')
            ->where('current_admin.admin_id', $admin->id)
            ->where('c.contract_key', $input->contractKey)
            ->where('c.chat_type', $input->chatType->value)
            ->whereNull('current_admin.deleted_at')
            ->whereNull('c.deleted_at')
            ->orderByDesc('c.last_message_updated_at')
            ->orderByDesc('c.created_at');

        if ($input->name !== null) {
            $query->where('cu.full_name', 'like', '%' . addcslashes($input->name, '%_\\') . '%');
        }
        switch ($input->filterStatus) {
            case FilterStatusParamEnum::SPAM:
                $query->where('is_spam', true);
                break;
            case FilterStatusParamEnum::PROCESSED:
                $query->where('is_processed', true);
                break;
            case FilterStatusParamEnum::UNREAD:
                $query->where('current_admin.unread_count', '>', 0);
                break;
            case FilterStatusParamEnum::PENDING:
                //一度以上のチャットが発生しているが、”対応済みでない”チャットルーム
                $query->where('is_spam', false)
                    ->where('is_processed', false)
                    ->whereNotNull('c.last_message');
                break;
            case FilterStatusParamEnum::ALL:
                break;
        }

        return $query->paginate(self::PER_PAGE, ['*'], 'page', $input->page);
    }
}
