import { ChatroomType } from '@admin/domain/chat/models/ChatroomType';
import { AvatarWithStatusBudge } from '@admin/features/inquiryChat/chat/components/ChatroomContainer/ChatroomList/AvatarWithStatusBadge';
import styles from './RoomInfo.module.css';
import { ActiveMarking } from './ActiveMarking';
import { UnreadCount } from './UnreadCount';
import { LastMessage } from './LastMessage';
import { LastMessageUpdatedAt } from './LastMessageUpdatedAt';

type Props = {
    chatroom: ChatroomType;
    openChatroom: (chatroom: ChatroomType) => void;
};
export const RoomInfo = ({ chatroom, openChatroom }: Props) => {
    return (
        <div className={styles.container} onClick={() => openChatroom(chatroom)}>
            <div className={styles.userInfo}>
                <AvatarWithStatusBudge
                    isSpam={chatroom.isSpam}
                    isProcessed={chatroom.isProcessed}
                    imgPath={chatroom.avatarImgPath ?? undefined}
                />
                <div className={styles.activity}>
                    <p className={styles.name}>
                        {chatroom.roomTitle}
                        <UnreadCount unreadCount={chatroom.unreadCount} />
                    </p>
                    <LastMessage lastMessage={chatroom.lastMessage} />
                </div>
            </div>
            <LastMessageUpdatedAt lastMessageUpdatedAt={chatroom.lastMessageUpdatedAt} />
            <ActiveMarking chatroom={chatroom} />
        </div>
    );
};
