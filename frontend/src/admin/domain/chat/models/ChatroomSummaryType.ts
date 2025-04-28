export type ChatroomSummaryType = {
    chatroomId: number;
    lastMessage: string;
    lastMessageUpdatedAt: Date | null;
    isProcessed: boolean;
    isSpam: boolean;
    unreadCount: number;
};
