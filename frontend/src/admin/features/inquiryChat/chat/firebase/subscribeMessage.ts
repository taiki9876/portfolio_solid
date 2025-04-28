import { ChatroomType } from '@admin/domain/chat/models/ChatroomType';
import { MessageType } from '@admin/domain/chat/models/MessageType';
import { firestore } from '@src/shared/firebase/firebase';
import { onSnapshot, query, collection, where, orderBy, limit } from 'firebase/firestore';
import { convertToMessage } from '@admin/domain/chat/transform';
import { messageCollectionPath } from './_collectionPath';

const LIMIT_BASE = 20;
export const subscribeChatMessages = (
    chatroom: ChatroomType,
    page: number,
    callback: (message: MessageType[], hasMore: boolean) => void
) => {
    const currentLimit = page * LIMIT_BASE;
    const queryConditions = [
        where('deletedAt', '==', null),
        where('chatroomId', '==', chatroom.id),
        orderBy('sendAt', 'desc'),
        limit(currentLimit),
    ];

    return onSnapshot(
        query(collection(firestore, messageCollectionPath(chatroom)), ...queryConditions),
        (snapshots) => {
            if (snapshots.size === 0) {
                callback([], false);
                return;
            }

            const docs = snapshots.docs;
            const hasMore = snapshots.size >= currentLimit;

            const messages = docs.reverse().map((doc) => convertToMessage(doc));
            callback(messages, hasMore);
        }
    );
};
