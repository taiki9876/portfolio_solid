import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import { ChatroomType } from '@admin/domain/chat/models/ChatroomType';

export const useRealtimeSortRooms = (chatrooms: ChatroomType[]) => {
    const realtimeChatrooms = useInquiryStore((state) => state.chatroomSummaries);

    const sortedRooms = chatrooms
        .map((chatroom) => {
            const realtimeChatroom = realtimeChatrooms.find(
                (realtimeChatroom) => realtimeChatroom.chatroomId === chatroom.id
            );
            if (realtimeChatroom === undefined) {
                return chatroom;
            }
            return {
                ...chatroom,
                isProcessed: realtimeChatroom.isProcessed,
                isSpam: realtimeChatroom.isSpam,
                unreadCount: realtimeChatroom.unreadCount,
                lastMessage: realtimeChatroom.lastMessage,
                lastMessageUpdatedAt: realtimeChatroom.lastMessageUpdatedAt,
            };
        })
        .sort((a, b) => {
            const aTime = a.lastMessageUpdatedAt?.getTime() ?? -Infinity;
            const bTime = b.lastMessageUpdatedAt?.getTime() ?? -Infinity;
            return bTime - aTime;
        });

    return { sortedRooms };
};
