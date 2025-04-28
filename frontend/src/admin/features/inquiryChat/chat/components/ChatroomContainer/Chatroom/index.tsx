import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import { MessageForm } from './MessageForm';
import { ChatContentContextProvider } from './context/ChatContentContextProvider';
import { DefaultChatScreen } from './DefaultChatScreen';
import { ChatroomHeader } from './ChatroomHeader';
import { ChatroomContent } from './ChatroomContent';
import styles from './Chatroom.module.css';

export const Chatroom = () => {
    const currentChatroom = useInquiryStore((state) => state.currentChatroom);
    const isOpened = currentChatroom !== undefined;

    return (
        <div
            className={`${styles.commonContainerStyle} ${isOpened ? styles.chatroomContainer : styles.defaultScreenContainer}`}
        >
            {!isOpened ? (
                <DefaultChatScreen />
            ) : (
                <ChatContentContextProvider>
                    <ChatroomHeader />
                    <ChatroomContent />
                    <MessageForm />
                </ChatContentContextProvider>
            )}
        </div>
    );
};
