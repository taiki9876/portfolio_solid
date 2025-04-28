export const MessageRule = {
    textMaxLength: 2000,
};
export type MessageContentMediaType = 'photo' | 'video';
export type MessageContentType = 'text' | 'processed' | MessageContentMediaType;
export type MessageSenderType = 'staff' | 'customer';
export type MessageType = {
    id: string;
    chatroomId: number;
    content: string;
    contentType: MessageContentType;
    senderUID: string;
    senderType: MessageSenderType;
    isReported: boolean;
    sendAt: Date;
    readAt: Date | null;
    readBy: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export const isReceive = (message: MessageType) => {
    return message.senderType === 'customer';
};
export const isRead = (message: MessageType) => {
    return message.readAt !== null;
};
export const canDelete = (message: MessageType) => {
    return message.senderType === 'staff';
};
