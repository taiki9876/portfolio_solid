import { MessageType } from '@admin/domain/chat/models/MessageType';
import { doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '@src/shared/firebase/firebase';
import { ChatroomType } from '@admin/domain/chat/models/ChatroomType';
import { messageCollectionPath } from './_collectionPath';

export const deleteMessage = async (chatroom: ChatroomType, message: MessageType) => {
    const messageRef = doc(firestore, messageCollectionPath(chatroom), message.id);
    await updateDoc(messageRef, {
        updatedAt: serverTimestamp(),
        deletedAt: serverTimestamp(),
    });
};

export const forceDeleteMessage = async (chatroom: ChatroomType, message: MessageType) => {
    const messageRef = doc(firestore, messageCollectionPath(chatroom), message.id);
    await deleteDoc(messageRef);
};
