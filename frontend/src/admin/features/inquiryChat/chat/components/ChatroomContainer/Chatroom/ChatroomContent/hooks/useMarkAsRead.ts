import { useCallback, useEffect, useRef } from 'react';
import { MessageType } from '@admin/domain/chat/models/MessageType';
import { useAuthStore } from '@admin/shared/state/globalState';
import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { markMessagesAsRead } from '@admin/features/inquiryChat/chat/firebase/markMessageAsRead';

export const useMarkAsRead = () => {
    const { admin } = useAuthStore();
    const currentChatroom = useInquiryStore((state) => state.currentChatroom);
    const unreadMessageTmp = useRef<MessageType[]>([]);
    const windowState = useRef<'background' | 'active'>('active');

    /**
     * tmpの未読を既読にする
     */
    const _markUnreadMessageTmpAsRead = useCallback(async (): Promise<void> => {
        if (admin === undefined || currentChatroom === undefined) {
            return;
        }
        if (unreadMessageTmp.current.length > 0) {
            await markMessagesAsRead(admin, currentChatroom, unreadMessageTmp.current, () =>
                ApiEndpoint.chat.markRead(currentChatroom.id)
            );
            unreadMessageTmp.current = [];
        }
    }, [admin, currentChatroom]);

    const visibilitychangeEvent = useCallback(() => {
        if (document.visibilityState === 'visible') {
            windowState.current = 'active';
            void _markUnreadMessageTmpAsRead();
        } else if (document.visibilityState === 'hidden') {
            windowState.current = 'background';
        }
    }, [_markUnreadMessageTmpAsRead]);
    const focusEvent = useCallback(() => {
        windowState.current = 'active';
        void _markUnreadMessageTmpAsRead();
    }, [_markUnreadMessageTmpAsRead]);
    const blurEvent = () => {
        windowState.current = 'background';
    };

    useEffect(() => {
        document.addEventListener('visibilitychange', visibilitychangeEvent);
        window.addEventListener('focus', focusEvent);
        window.addEventListener('blur', blurEvent);

        return () => {
            document.removeEventListener('visibilitychange', visibilitychangeEvent);
            window.removeEventListener('focus', focusEvent);
            window.removeEventListener('blur', blurEvent);
        };
    }, [focusEvent, visibilitychangeEvent]);

    const markAsReadIfUnreadExists = useCallback(
        async (messages: MessageType[]): Promise<void> => {
            if (admin === undefined || currentChatroom === undefined) {
                return;
            }

            const unReadMessages = messages.filter(
                (message) =>
                    message.senderType === 'customer' &&
                    !message.readBy.includes(admin.typePrefixId)
            );

            if (windowState.current === 'active') {
                unreadMessageTmp.current = [];
                if (unReadMessages.length > 0) {
                    await markMessagesAsRead(admin, currentChatroom, unReadMessages, () =>
                        ApiEndpoint.chat.markRead(currentChatroom.id)
                    );
                }
            } else {
                unreadMessageTmp.current = uniqueMessages([
                    ...unreadMessageTmp.current,
                    ...unReadMessages,
                ]);
            }
        },
        [admin, currentChatroom]
    );

    return {
        markAsReadIfUnreadExists,
    };
};

const uniqueMessages = (messages: MessageType[]) => {
    const messageIds = new Set();
    return messages.filter((mes) => {
        return !messageIds.has(mes.id) && messageIds.add(mes.id);
    });
};
