import { ChatroomType } from '@admin/domain/chat/models/ChatroomType';
import { MessageRule } from '@admin/domain/chat/models/MessageType';
import { useAuthStore, useToastNotificationStore } from '@admin/shared/state/globalState';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { sendTextMessage } from '@admin/features/inquiryChat/chat/firebase/sendMessage';
import { useChatContentContext } from '../../../context/useChatContentContext';

export const useSendMessage = (
    text: string,
    currentChatroom: ChatroomType | undefined,
    clearInput: () => void
) => {
    const { scrollToBottom } = useChatContentContext();
    const { notify } = useToastNotificationStore();

    const { admin } = useAuthStore();

    const handleSendMessage = async () => {
        if (currentChatroom === undefined || admin === undefined) {
            return;
        }

        if (!isValidMessage(text)) {
            return;
        }

        try {
            await sendTextMessage(currentChatroom, admin, text);
            clearInput();

            await ApiEndpoint.chat.processSend(currentChatroom.id);

            scrollToBottom(true);
        } catch (error) {
            console.error(error);
            notify('メッセージの送信に失敗しました', 'error');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const isMac = navigator.userAgent.toUpperCase().includes('MAC');
        const isCommandOrCtrlPressed = isMac ? event.metaKey : event.ctrlKey;

        if (isCommandOrCtrlPressed && event.key === 'Enter') {
            event.preventDefault();
            void handleSendMessage();
        }
    };

    return {
        handleKeyDown,
        handleSendMessage,
    };
};

const isValidMessage = (text: string) => {
    if (text.trim() === '') {
        return false;
    }

    if (text.length > MessageRule.textMaxLength) {
        alert(`メッセージは${MessageRule.textMaxLength}文字以内で入力してください`);
        return false;
    }

    return true;
};
