import { ChatroomCustomerApiResource, ChatroomsApiResource } from '@admin/domain/chat/transform';

export const dummyChatroomsResponse: ChatroomsApiResource[] = [
    {
        chatroomId: 1,
        contractKey: 'dummy contract',
        chatType: 'staff',
        customerName: 'dummy customer',
        customerAvatarImageUrl: null,
        isProcessed: false,
        isSpam: false,
        lastMessage: 'dummy message',
        lastMessageUpdatedAt: '2021-01-01 10:00:00',
        unreadMessageCount: 1,
    },
];

export const dummyChatroomCustomerResponse: ChatroomCustomerApiResource[] = [
    {
        customerId: '1',
        customerCode: 'dummy code',
        customerName: 'dummy customer',
        avatarImageUrl: null,
        rank: 'dummy rank',
        birthday: '1990-01-01',
        age: '30',
        gender: '不明',
        entryAt: '2021-01-01 10:00:00',
        lastVisitAt: '2021-01-01 10:00:00',
        memo: 'dummy memo',
    },
];
