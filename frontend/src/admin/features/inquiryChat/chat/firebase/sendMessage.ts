import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '@src/shared/firebase/firebase';
import { ChatroomType } from '@admin/domain/chat/models/ChatroomType';
import {
    makeFirestorePhotoMessage,
    makeFirestoreProcessedMessage,
    makeFirestoreTextMessage,
    makeFirestoreVideoMessage,
} from '@admin/domain/chat/firestoreModel';
import { Admin } from '@admin/domain/admin/model';
import { messageCollectionPath } from './_collectionPath';

export const sendTextMessage = async (chatroom: ChatroomType, sender: Admin, text: string) => {
    await addDoc(
        collection(firestore, messageCollectionPath(chatroom)),
        makeFirestoreTextMessage(chatroom.id, sender.typePrefixId, text)
    );
};

export const sendProcessedMessage = async (chatroom: ChatroomType, sender: Admin) => {
    await addDoc(
        collection(firestore, messageCollectionPath(chatroom)),
        makeFirestoreProcessedMessage(chatroom.id, sender.typePrefixId)
    );
};

export const sendPhotoMessage = async (chatroom: ChatroomType, sender: Admin, photoURL: string) => {
    await addDoc(
        collection(firestore, messageCollectionPath(chatroom)),
        makeFirestorePhotoMessage(chatroom.id, sender.typePrefixId, photoURL)
    );
};

export const sendVideoMessage = async (chatroom: ChatroomType, sender: Admin, videoURL: string) => {
    await addDoc(
        collection(firestore, messageCollectionPath(chatroom)),
        makeFirestoreVideoMessage(chatroom.id, sender.typePrefixId, videoURL)
    );
};
