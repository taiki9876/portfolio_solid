<?php

declare(strict_types=1);

namespace App\Models\Customer\Services;

use App\Infrastructure\Firebase\FirebaseAuth;
use App\Infrastructure\Repository\AdminEloquentRepository;
use App\Infrastructure\Repository\ChatroomEloquentRepository;
use App\Infrastructure\Repository\CustomerEloquentRepository;
use App\Models\Admin\Admin;
use App\Models\Chatroom\Chatroom;
use App\Models\Chatroom\ChatroomMember;
use App\Models\Chatroom\ValueObjects\ChatroomTypeEnum;
use App\Models\Contract\Contract;
use App\Models\Customer\Customer;
use Kreait\Firebase\Exception\AuthException;
use Kreait\Firebase\Exception\FirebaseException;

class CustomerCreator
{
    public function __construct(
        private readonly CustomerEloquentRepository $customerRepository,
        private readonly FirebaseAuth $firebaseAuth,
        private readonly AdminEloquentRepository $adminRepository,
        private readonly ChatroomEloquentRepository $chatroomRepository
    ) {
    }

    /**
     * 会員アカウントの作成
     * 1.MySQLへの保存
     * 2.Firebaseへのユーザー作成
     * 3.チャットルームの作成
     * @param  Contract          $contract
     * @param  Customer          $customer
     * @return Customer
     * @throws AuthException
     * @throws FirebaseException
     */
    public function createCustomer(Contract $contract, Customer $customer): Customer
    {
        $customer = $this->customerRepository->save($customer);

        $this->firebaseAuth->createAuthUser($contract, $customer);
        $staffs = $this->adminRepository
            ->findByContractId($contract->id)
            ->filter(static fn (Admin $admin) => !$admin->isSystemAdmin() && !$admin->isSupportAdmin());

        $members = [ChatroomMember::create($customer)];
        foreach ($staffs as $staff) {
            $members[] = ChatroomMember::create($staff);
        }

        $room = Chatroom::create($contract, ChatroomTypeEnum::STORE, $members);
        $this->chatroomRepository->save($room);

        return $customer;
    }
}
