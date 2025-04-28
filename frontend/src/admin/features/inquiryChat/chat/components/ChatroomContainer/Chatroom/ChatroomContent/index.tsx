import { Fragment, useEffect } from 'react';
import { SmallLoading } from '@admin/shared/components/Ui/Loading/SmallLoading';
import { isReceive, MessageType } from '@admin/domain/chat/models/MessageType';
import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import { useChatContentContext } from '../context/useChatContentContext';
import { Message } from './Message';
import styles from './ChatroomContent.module.css';
import { DateLine } from './DateLine';
import { LoadMoreArea } from './LoadMoreArea';
import { GroupedMessageType, useSubscribeMessages } from './hooks/useSubscribeMessages';
import { useSignedUrlCache } from './hooks/useSignedUrlCache';

// メッセージの描画コンポーネント
export const ChatroomContent = () => {
    const { chatRoomRef, scrollToBottom } = useChatContentContext();
    const currentChatroom = useInquiryStore((state) => state.currentChatroom);
    const { isLoading, groupedMessages, hasMore, loadMoreMessages, messagePageNumber } =
        useSubscribeMessages(currentChatroom);
    useSignedUrlCache(currentChatroom, extractMessage(groupedMessages));

    useEffect(() => {
        // 初回：メッセージが取得されたら一番下までスクロール
        if (!isLoading && messagePageNumber === 1) {
            scrollToBottom();
        }
    }, [isLoading, messagePageNumber, scrollToBottom]);

    return (
        <div ref={chatRoomRef} className={styles.chatContainer}>
            <LoadMoreArea
                hasMore={hasMore}
                loadMoreMessages={loadMoreMessages}
                messages={extractMessage(groupedMessages)}
                rootRef={chatRoomRef.current}
            />

            {isLoading || groupedMessages === undefined ? (
                <div className={styles.noMessage}>
                    <SmallLoading />
                </div>
            ) : groupedMessages.length === 0 ? (
                <div className={styles.noMessage}>メッセージはありません。</div>
            ) : (
                <MessageList groupedMessages={groupedMessages} />
            )}
        </div>
    );
};

type Props = {
    groupedMessages: GroupedMessageType[];
};
const MessageList = ({ groupedMessages }: Props) => {
    return (
        <>
            {groupedMessages.map(({ dateStr, messages }) => {
                return (
                    <Fragment key={dateStr}>
                        <DateLine str={dateStr} />
                        {messages.map((message: MessageType) => (
                            <Message
                                key={message.id}
                                message={message}
                                isReceive={isReceive(message)}
                            />
                        ))}
                    </Fragment>
                );
            })}
        </>
    );
};

const extractMessage = (groupedMessages: GroupedMessageType[] | undefined) => {
    if (groupedMessages === undefined) {
        return [];
    }
    return groupedMessages?.flatMap(({ messages }) => messages);
};
