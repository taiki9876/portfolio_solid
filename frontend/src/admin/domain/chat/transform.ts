import { ChatroomSummaryType } from '@admin/domain/chat/models/ChatroomSummaryType';
import { ChatroomCustomerType } from '@admin/domain/chat/models/ChatrromCustomerType';
import { MessageType } from '@admin/domain/chat/models/MessageType';
import { ChatroomCategoryType, ChatroomType } from '@admin/domain/chat/models/ChatroomType';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import {
    FirestoreChatroomSummaryType,
    FirestoreMessageType,
    SummaryUnreadCountType,
} from '@admin/domain/chat/firestoreModel';

//Chatroom-------
export type ChatroomsApiResource = {
    chatroomId: number;
    contractKey: string;
    chatType: ChatroomCategoryType;
    customerName: string;
    customerAvatarImageUrl: string | null;
    isProcessed: boolean;
    isSpam: boolean;
    lastMessage: string | null;
    lastMessageUpdatedAt: string | null;
    unreadMessageCount: number;
};
export const convertToChatroom = (data: ChatroomsApiResource): ChatroomType => {
    return {
        id: data.chatroomId,
        contractKey: data.contractKey,
        chatType: data.chatType,
        roomTitle: data.customerName,
        avatarImgPath: data.customerAvatarImageUrl,
        isProcessed: data.isProcessed,
        isSpam: data.isSpam,
        lastMessage: data.lastMessage,
        lastMessageUpdatedAt:
            data.lastMessageUpdatedAt === null ? null : new Date(data.lastMessageUpdatedAt),
        unreadCount: data.unreadMessageCount,
    };
};

//Message-------

export const convertToMessage = (doc: QueryDocumentSnapshot): MessageType => {
    const data = doc.data() as FirestoreMessageType;

    return {
        id: doc.id,
        chatroomId: data.chatroomId,
        content: data.content,
        contentType: data.contentType,
        senderUID: data.senderUID,
        senderType: data.senderType,
        isReported: data.isReported,
        sendAt: data.sendAt === null ? new Date() : data.sendAt.toDate(),
        readAt: data.readAt === null ? null : data.readAt.toDate(),
        readBy: data.readBy,
        createdAt: data.createdAt === null ? new Date() : data.createdAt.toDate(),
        updatedAt: data.updatedAt === null ? new Date() : data.updatedAt.toDate(),
        deletedAt: data.deletedAt === null ? null : data.deletedAt.toDate(),
    };
};

//ChatroomCustomer-------
export type ChatroomCustomerApiResource = {
    customerId: string;
    customerCode: string;
    customerName: string;
    avatarImageUrl: string | null;
    rank: string;
    birthday: string | null;
    age: string | null;
    gender: string;
    entryAt: string | null;
    lastVisitAt: string | null;
    memo: string | null;
};
export const convertToChatroomCustomer = (
    data: ChatroomCustomerApiResource
): ChatroomCustomerType => {
    return {
        customerId: data.customerId,
        customerCode: data.customerCode,
        customerName: data.customerName,
        avatarImageUrl: data.avatarImageUrl,
        rank: data.rank,
        birthday: data.birthday === null ? null : new Date(data.birthday),
        age: data.age,
        gender: data.gender,
        entryAt: data.entryAt === null ? null : new Date(data.entryAt),
        lastVisitAt: data.lastVisitAt === null ? null : new Date(data.lastVisitAt),
        memo: data.memo,
    };
};

//ChatroomSummary-------
export const convertToChatroomSummary = (
    doc: QueryDocumentSnapshot,
    calcUnreadCount: (counts: SummaryUnreadCountType) => number
): ChatroomSummaryType => {
    const data = doc.data() as FirestoreChatroomSummaryType;
    return {
        chatroomId: data.chatroomId,
        lastMessage: data.lastMessage,
        lastMessageUpdatedAt:
            data.lastMessageUpdatedAt === null ? null : data.lastMessageUpdatedAt.toDate(),
        isProcessed: data.isProcessed,
        isSpam: data.isSpam,
        unreadCount: calcUnreadCount(data.unreadCounts),
    };
};
