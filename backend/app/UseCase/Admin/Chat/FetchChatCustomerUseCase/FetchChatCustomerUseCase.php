<?php

declare(strict_types=1);

namespace App\UseCase\Admin\Chat\FetchChatCustomerUseCase;

use App\Infrastructure\Repository\ChatroomEloquentRepository;
use App\Infrastructure\Repository\CustomerEloquentRepository;
use App\Models\Chatroom\ChatroomMember;
use App\Models\Chatroom\ValueObjects\MemberTypeEnum;
use App\Models\Customer\Customer;
use DomainException;

class FetchChatCustomerUseCase
{
    public function __construct(
        private readonly ChatroomEloquentRepository $chatroomRepository,
        private readonly CustomerEloquentRepository $customerRepository,
    ) {
    }

    public function execute(int $chatroomId): FetchChatCustomerOutput
    {
        $customer = $this->getCustomer($chatroomId);

        return new FetchChatCustomerOutput(
            customerId: $customer->id,
            customerCode: "C1123456",//TODO: 会員コードが実装されたら修正
            customerName: $customer->full_name,
            avatarImageUrl: $customer->avatar_image_path,
            rank: 'ノーマル',//TODO: ランク機能が実装されたら修正
            birthday: $customer->birth_date?->format('Y-m-d'),
            age: $customer->age(),
            gender: $customer->sex->description(),
            entryAt: $customer->entry_at?->format('Y-m-d'),
            lastVisitAt: $customer->last_visit_at?->format('Y-m-d'),
            memo: $customer->memo,
        );
    }

    private function getCustomer(int $chatroomId): Customer
    {
        $chatroom = $this->chatroomRepository->findById($chatroomId, withMembers: true);
        if ($chatroom === null) {
            throw new DomainException('チャットルームが見つかりませんでした');
        }

        $customerAsChatMember = $chatroom->members->first(static fn (ChatroomMember $member) => $member->memberType()->is(MemberTypeEnum::CUSTOMER));
        if ($customerAsChatMember === null) {
            throw new DomainException('チャットルームに会員が見つかりませんでした');
        }

        assert(is_int($customerAsChatMember->customer_id));
        $customer = $this->customerRepository->findById($customerAsChatMember->customer_id);
        if ($customer === null) {
            throw new DomainException('会員が見つかりませんでした');
        }

        return $customer;
    }
}
