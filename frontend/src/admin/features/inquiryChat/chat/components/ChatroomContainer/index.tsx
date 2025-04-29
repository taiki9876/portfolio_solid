import { ChatroomList } from '@admin/features/inquiryChat/chat/components/ChatroomContainer/ChatroomList';
import { Chatroom } from '@admin/features/inquiryChat/chat/components/ChatroomContainer/Chatroom';
import styles from './ChatroomContainer.module.css';

export const ChatroomContainer = () => {
    return (
        <div className={styles.container}>
            <ChatroomList />
            <Chatroom />
        </div>
    );
};
