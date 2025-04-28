import { useCallback, useEffect, useRef, useState } from 'react';
import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import { ChatroomType } from '@admin/domain/chat/models/ChatroomType';
import { MessageType } from '@admin/domain/chat/models/MessageType';
import { formatDate, isThisYear, isToday } from '@admin/shared/util/dateUtil';
import { dayjs } from '@admin/shared/lib/dayjs';
import { subscribeChatMessages } from '@admin/features/inquiryChat/chat/firebase/subscribeMessage';
import { useMarkAsRead } from './useMarkAsRead';

//日付ごとにグルーピングする
export type GroupedMessageType = {
    dateStr: string;
    messages: MessageType[];
};
export const useSubscribeMessages = (currentChatroom: ChatroomType | undefined) => {
    const _unsubscribe = useRef<() => void | undefined>(undefined);
    const { markAsReadIfUnreadExists } = useMarkAsRead();

    const messagePageNumber = useInquiryStore((state) => state.messagePageNumber);
    const loadMoreMessages = useInquiryStore((state) => state.loadMoreMessages);
    const setLatestMessage = useInquiryStore((state) => state.setLatestMessage);

    const [groupedMessages, setGroupedMessages] = useState<GroupedMessageType[] | undefined>(
        undefined
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const _unsubscribeMessages = () => {
        if (_unsubscribe.current !== undefined) {
            _unsubscribe.current();
        }
    };

    //NOTE: 最新メッセージの保持や、既読処理などを行う
    const _readMessageHook = useCallback(
        (messages: MessageType[]) => {
            const planeMessages = messages.filter((message) => message.contentType !== 'processed');
            setLatestMessage({
                ignoreProcessed:
                    planeMessages.length > 0 ? planeMessages[planeMessages.length - 1] : undefined,
                all: messages.length > 0 ? messages[messages.length - 1] : undefined,
            });

            void markAsReadIfUnreadExists(planeMessages);
        },
        [markAsReadIfUnreadExists, setLatestMessage]
    );

    useEffect(() => {
        if (currentChatroom === undefined) {
            return;
        }

        _unsubscribeMessages();

        setIsLoading(true);
        setHasMore(false);
        _unsubscribe.current = subscribeChatMessages(
            currentChatroom,
            messagePageNumber,
            (messages, hasMoreMessage) => {
                _readMessageHook(messages);
                setGroupedMessages(makeGroupedMessages(messages));
                setIsLoading(false);
                setHasMore(hasMoreMessage);
            }
        );

        return () => {
            _unsubscribeMessages();
        };
    }, [
        _readMessageHook,
        currentChatroom,
        markAsReadIfUnreadExists,
        messagePageNumber,
        setLatestMessage,
    ]);

    return {
        groupedMessages,
        isLoading,
        hasMore,
        loadMoreMessages,
        messagePageNumber,
    };
};

const makeGroupedMessages = (messages: MessageType[] | undefined) => {
    if (messages === undefined) {
        return [];
    }
    return messages.reduce<{ dateStr: string; messages: MessageType[] }[]>((grouped, message) => {
        const dateStr = makeDateStr(message.sendAt);
        if (grouped.length === 0) {
            grouped.push({ dateStr, messages: [message] });
            return grouped;
        }

        const lastGroup = grouped[grouped.length - 1];
        if (lastGroup.dateStr === dateStr) {
            lastGroup.messages.push(message);
        } else {
            grouped.push({ dateStr, messages: [message] });
        }
        return grouped;
    }, []);
};

const makeDateStr = (target: Date) => {
    if (isToday(target)) {
        return '今日';
    }

    if (isToday(dayjs(target).add(1, 'day'))) {
        return '昨日';
    }
    if (isToday(dayjs(target).add(2, 'day'))) {
        return '一昨日';
    }

    return formatDate(target, {
        withWeekday: true,
        withYear: !isThisYear(target),
    });
};
