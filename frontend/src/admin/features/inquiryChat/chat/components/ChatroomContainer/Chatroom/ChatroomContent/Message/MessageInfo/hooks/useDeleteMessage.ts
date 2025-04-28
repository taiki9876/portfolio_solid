import { canDelete, isRead, MessageType } from '@admin/domain/chat/models/MessageType';
import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import { useToastNotificationStore } from '@admin/shared/state/globalState';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { deleteMessage } from '@admin/features/inquiryChat/chat/firebase/deleteMessage';

export const useDeleteMessage = (message: MessageType, close: () => void) => {
    const currentChatroom = useInquiryStore((state) => state.currentChatroom);
    const latestMessage = useInquiryStore((state) => state.latestMessage);
    const { notify } = useToastNotificationStore();

    const handleDelete = async () => {
        if (currentChatroom === undefined) {
            return;
        }
        if (!canDelete(message)) {
            alert('メッセージは削除できません');
            close();
            return;
        }

        if (!confirm(confirmMessage(message))) {
            close();
            return;
        }

        try {
            await deleteMessage(currentChatroom, message);

            const isLastMessage = latestMessage?.ignoreProcessed?.id === message.id;
            const isUnreadMessage = !isRead(message);

            if (isLastMessage || isUnreadMessage) {
                await ApiEndpoint.chat.processDelete(
                    currentChatroom.id,
                    isLastMessage,
                    isUnreadMessage
                );
            }
        } catch (error) {
            console.error('Failed to delete message:', error);
            notify('メッセージの削除に失敗しました', 'error');
        }
    };
    return { handleDelete };
};

const truncateText = (text: string, limit: number): string => {
    if (text.length <= limit) return text;
    return `${text.slice(0, limit)}...`;
};

const confirmMessage = (message: MessageType) => {
    if (message.contentType === 'text') {
        return `このメッセージを削除しますか？\n${truncateText(message.content, 16)}`;
    }

    if (message.contentType === 'photo') {
        return 'この画像を削除しますか？';
    }

    if (message.contentType === 'video') {
        return 'この動画を削除しますか？';
    }

    return 'このメッセージを削除しますか？';
};
