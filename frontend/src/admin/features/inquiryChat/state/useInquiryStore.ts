import { create } from 'zustand';
import { ChatroomSummaryType } from '@admin/domain/chat/models/ChatroomSummaryType';
import { MessageType } from '@admin/domain/chat/models/MessageType';
import { ChatroomCategoryType, ChatroomType } from '@admin/domain/chat/models/ChatroomType';

export type SearchStatusType = 'all' | 'unread' | 'processed' | 'spam' | 'pending';
export type SearchConditionType = { status: SearchStatusType; name: string | undefined };
export type SignedUrlType = {
    signedUrl: string | null;
    expiredAt: Date;
};

type InquiryState = {
    currentTab: ChatroomCategoryType;
    changeTab: (tab: ChatroomCategoryType) => void;

    searchCondition: {
        chatType: ChatroomCategoryType;
        status: SearchStatusType;
        name: string | undefined;
    };
    setSearchCondition: (condition: Partial<SearchConditionType>) => void;

    currentChatroom: ChatroomType | undefined;
    openChatroom: (chatroomId: ChatroomType) => void;

    messagePageNumber: number;
    loadMoreMessages: () => void;

    latestMessage:
        | { ignoreProcessed: MessageType | undefined; all: MessageType | undefined }
        | undefined;
    setLatestMessage: (lastMessage: {
        ignoreProcessed: MessageType | undefined;
        all: MessageType | undefined;
    }) => void;

    signedUrls: Record<string, SignedUrlType>;
    setSignedUrls: (urls: Record<string, SignedUrlType>) => void;

    //chatroom summary
    chatroomSummaries: ChatroomSummaryType[];
    setChatroomSummaries: (summaries: ChatroomSummaryType[]) => void;
};

export const useInquiryStore = create<InquiryState>()((set) => ({
    currentTab: 'store',
    changeTab: (tab: ChatroomCategoryType) =>
        set((state) => {
            const newCondition = { ...state.searchCondition, chatType: tab };
            return { currentTab: tab, searchCondition: newCondition };
        }),

    searchCondition: { chatType: 'store', status: 'all', name: undefined },
    setSearchCondition: (condition: Partial<SearchConditionType>) =>
        set((state) => ({ page: 1, searchCondition: { ...state.searchCondition, ...condition } })),

    currentChatroom: undefined,
    openChatroom: (chatroom: ChatroomType) =>
        set((state) => {
            if (state.currentChatroom?.id === chatroom.id) {
                return state;
            }
            return { currentChatroom: chatroom, messagePageNumber: 1 };
        }),

    messagePageNumber: 1,
    loadMoreMessages: () => set((state) => ({ messagePageNumber: state.messagePageNumber + 1 })),

    latestMessage: undefined,
    setLatestMessage: (latestMessage: {
        ignoreProcessed: MessageType | undefined;
        all: MessageType | undefined;
    }) => set({ latestMessage }),

    signedUrls: {},
    setSignedUrls: (urls: Record<string, SignedUrlType>) => set({ signedUrls: urls }),

    chatroomSummaries: [],
    setChatroomSummaries: (summaries: ChatroomSummaryType[]) =>
        set({ chatroomSummaries: summaries }),
}));
