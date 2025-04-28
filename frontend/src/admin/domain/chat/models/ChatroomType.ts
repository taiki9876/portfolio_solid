export type ChatroomCategoryType = 'store' | 'staff'; //バックエンドのEnumと型を合わせること
export type ChatroomType = {
    id: number;
    contractKey: string;
    chatType: ChatroomCategoryType;
    roomTitle: string;
    avatarImgPath: string | null;
    isProcessed: boolean;
    isSpam: boolean;
    lastMessage: string | null;
    lastMessageUpdatedAt: Date | null;
    unreadCount: number;
};

export type ChatroomStatusType = 'processed' | 'spam';
