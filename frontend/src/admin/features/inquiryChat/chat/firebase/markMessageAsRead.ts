import { firestore } from '@src/shared/firebase/firebase';
import { ChatroomType } from '@admin/domain/chat/models/ChatroomType';
import { Admin } from '@admin/domain/admin/model';
import { MessageType } from '@admin/domain/chat/models/MessageType';
import { writeBatch, doc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { messageCollectionPath } from './_collectionPath';

export const markMessagesAsRead = async (
    reader: Admin,
    chatroom: ChatroomType,
    targetMessages: MessageType[],
    dataSyncFunction: () => Promise<boolean>
): Promise<void> => {
    const batch = writeBatch(firestore);

    // メッセージを既読にする
    targetMessages.forEach((message) => {
        batch.update(doc(firestore, `${messageCollectionPath(chatroom)}/${message.id}`), {
            readBy: arrayUnion(reader.typePrefixId),
            readAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
    });

    const isSuccess = await dataSyncFunction();

    if (isSuccess) {
        await batch.commit();
    }
};
