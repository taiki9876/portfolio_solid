import { ChatroomSummaryType } from '@admin/domain/chat/models/ChatroomSummaryType';
import { firestore } from '@src/shared/firebase/firebase';
import { onSnapshot, query, collection, where, Timestamp } from 'firebase/firestore';
import { Admin } from '@admin/domain/admin/model';
import { convertToChatroomSummary } from '@admin/domain/chat/transform';
import { SummaryUnreadCountType } from '@admin/domain/chat/firestoreModel';
import { summaryCollectionPath } from './_collectionPath';

//チャットルーム情報（最新メッセージや未読件数などを取得）
export const subscribeSummary = (
    admin: Admin,
    callback: (summaries: ChatroomSummaryType[]) => void
) => {
    const calcUnreadCount = (unreadCounts: SummaryUnreadCountType) => {
        return unreadCounts[admin.typePrefixId] ?? 0;
    };
    const queryConditions = [where('updatedAt', '>', Timestamp.now())];

    return onSnapshot(
        query(collection(firestore, summaryCollectionPath(admin)), ...queryConditions),
        (snapshots) => {
            if (snapshots.size === 0) {
                callback([]);
                return;
            }
            const summaries: ChatroomSummaryType[] = snapshots.docs.map((doc) =>
                convertToChatroomSummary(doc, calcUnreadCount)
            );
            callback(summaries);
        }
    );
};
