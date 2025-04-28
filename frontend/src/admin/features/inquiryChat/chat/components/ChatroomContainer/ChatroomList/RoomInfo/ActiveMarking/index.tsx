import { ChatroomType } from '@admin/domain/chat/models/ChatroomType';
import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import styles from '../RoomInfo.module.css';

export const ActiveMarking = ({ chatroom }: { chatroom: ChatroomType }) => {
    const currentChatroom = useInquiryStore((state) => state.currentChatroom);

    if (currentChatroom === undefined) {
        return null;
    }

    if (chatroom.id !== currentChatroom.id) {
        return null;
    }
    return <div className={styles.activeBar} />;
};
