import { useEffect } from 'react';
import { ChatroomType } from '@admin/domain/chat/models/ChatroomType';
import { useInView } from '@src/shared/hooks/useInView';
import { SmallLoading } from '@admin/shared/components/Ui/Loading/SmallLoading';
import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import { useSearchChatroomsQuery } from '../hooks/useSearchChatroomsQuery';
import { RoomInfo } from './RoomInfo';
import { FilterMenu } from './FilterMenu';
import styles from './ChatroomList.module.css';
import { useSubscribeChatroomSummary } from './hooks/useSubscribeChatroomSummary';
import { useRealtimeSortRooms } from './hooks/useRealtimeSortRooms';

export const ChatroomList = () => {
    const { chatrooms, fetchNextPage, hasNextPage, isFetchingNextPage } = useSearchChatroomsQuery();
    useSubscribeChatroomSummary();
    const { ref, isIn } = useInView();

    useEffect(() => {
        if (isIn && hasNextPage && !isFetchingNextPage) {
            void fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isIn]);

    return (
        <div className={styles.listContainer}>
            <FilterMenu />

            <div className={styles.members}>
                <RoomInfoRow chatrooms={chatrooms} />

                {isFetchingNextPage && (
                    <div style={{ height: '32px' }}>
                        <SmallLoading />
                    </div>
                )}
                <div style={{ height: '10px', width: '100%' }} ref={ref} />
            </div>
        </div>
    );
};

type Props = {
    chatrooms: ChatroomType[];
};
const RoomInfoRow = ({ chatrooms }: Props) => {
    const openChatroom = useInquiryStore((state) => state.openChatroom);
    const { sortedRooms } = useRealtimeSortRooms(chatrooms);

    return (
        <>
            {sortedRooms.map((chatroom: ChatroomType) => (
                <RoomInfo key={chatroom.id} chatroom={chatroom} openChatroom={openChatroom} />
            ))}
        </>
    );
};
