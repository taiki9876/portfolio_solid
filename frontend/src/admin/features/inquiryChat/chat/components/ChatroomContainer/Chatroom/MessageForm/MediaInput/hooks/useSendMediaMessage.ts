import { useCallback } from 'react';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { ChatroomType } from '@admin/domain/chat/models/ChatroomType';
import { MessageContentMediaType } from '@admin/domain/chat/models/MessageType';
import { useAuthStore } from '@admin/shared/state/globalState';
import {
    sendPhotoMessage,
    sendVideoMessage,
} from '@admin/features/inquiryChat/chat/firebase/sendMessage';
import { useChatContentContext } from '../../../context/useChatContentContext';

export const useSendMediaMessage = (
    currentChatroom: ChatroomType | undefined,
    completion: () => void
) => {
    const { scrollToBottom } = useChatContentContext();
    const { admin } = useAuthStore();

    const handelSendPhotoMessage = useCallback(
        async (uploadImagePath: string, mediaType: MessageContentMediaType) => {
            if (currentChatroom === undefined || admin === undefined) {
                return;
            }
            if (!(mediaType === 'photo' || mediaType === 'video')) {
                throw new Error('ファイルタイプが不正です');
            }

            if (mediaType === 'photo') {
                await sendPhotoMessage(currentChatroom, admin, uploadImagePath);
            } else if (mediaType === 'video') {
                await sendVideoMessage(currentChatroom, admin, uploadImagePath);
            }

            await ApiEndpoint.chat.processSend(currentChatroom.id);

            scrollToBottom(true);
            completion();
        },
        [admin, completion, currentChatroom, scrollToBottom]
    );

    return { handelSendPhotoMessage };
};
