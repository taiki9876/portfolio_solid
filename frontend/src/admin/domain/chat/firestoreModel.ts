import { MessageContentType, MessageSenderType } from '@admin/domain/chat/models/MessageType';
import { serverTimestamp, Timestamp } from 'firebase/firestore';

export type FirestoreMessageType = {
    chatroomId: number;
    content: string;
    contentType: MessageContentType;
    senderUID: string;
    senderType: MessageSenderType;
    isReported: boolean;
    sendAt: Timestamp;
    readAt: Timestamp | null;
    readBy: string[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
    deletedAt: Timestamp | null;
};

const _commonFields = (chatroomId: number) => ({
    chatroomId,
    senderType: 'staff' as MessageSenderType,
    isReported: false,
    sendAt: serverTimestamp() as Timestamp,
    readAt: null,
    readBy: [],
    createdAt: serverTimestamp() as Timestamp,
    updatedAt: serverTimestamp() as Timestamp,
    deletedAt: null,
});

export const makeFirestoreTextMessage = (
    chatroomId: number,
    senderUID: string,
    text: string
): FirestoreMessageType => {
    return {
        ..._commonFields(chatroomId),
        content: text,
        contentType: 'text',
        senderUID,
    };
};
export const makeFirestoreProcessedMessage = (
    chatroomId: number,
    senderUID: string
): FirestoreMessageType => {
    return {
        ..._commonFields(chatroomId),
        content: '対応済み',
        contentType: 'processed',
        senderUID,
    };
};
export const makeFirestorePhotoMessage = (
    chatroomId: number,
    senderUID: string,
    photoURL: string
): FirestoreMessageType => {
    return {
        ..._commonFields(chatroomId),
        content: photoURL,
        contentType: 'photo',
        senderUID,
    };
};

export const makeFirestoreVideoMessage = (
    chatroomId: number,
    senderUID: string,
    videoURL: string
): FirestoreMessageType => {
    return {
        ..._commonFields(chatroomId),
        content: videoURL,
        contentType: 'video',
        senderUID,
    };
};

//-- Summary --
export type SummaryUnreadCountType = Record<string, number>;

export type FirestoreChatroomSummaryType = {
    chatroomId: number;
    lastMessage: string;
    lastMessageUpdatedAt: Timestamp | null;
    isProcessed: boolean;
    isSpam: boolean;
    unreadCounts: SummaryUnreadCountType;
};
