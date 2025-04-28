import { MessageType } from '@admin/domain/chat/models/MessageType';
import { randomNumber } from '@admin/shared/util/numberUtil';
import dummyImage from '@admin/assets/images/chatroom.png';
import dummy800150 from '@admin/assets/images/tmp/800x150.png';
import dummy150 from '@admin/assets/images/tmp/150x150.png';
import dummy150700 from '@admin/assets/images/tmp/150x700.png';

export const dummyTextMessage = (props: Partial<MessageType>): MessageType => {
    return {
        id: randomNumber(),
        chatroomId: 1,
        content: 'dummy text',
        contentType: 'text',
        senderType: 'staff',
        senderUID: 'dummy sender',
        isReported: false,
        sendAt: new Date(),
        readAt: new Date(),
        readBy: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        ...props,
    };
};

export const dummyPhotoMessage = (props: Partial<MessageType>): MessageType => {
    return {
        id: randomNumber(),
        chatroomId: 1,
        content: dummyImage,
        contentType: 'photo',
        senderUID: 'dummy sender',
        senderType: 'staff',
        isReported: false,
        sendAt: new Date(),
        readAt: new Date(),
        readBy: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        ...props,
    };
};

export const currentUserUID = 'dummy sender';
export const receiver = 'dummy receiver';
export const dummyMessages: MessageType[] = [
    dummyTextMessage({
        content:
            'はじめまして。よろしくお願いいたします。\nお困りごとがあればお気軽にお知らせください。',
        senderUID: currentUserUID,
        sendAt: new Date('2024-12-20 15:46:00'),
    }),
    dummyTextMessage({
        content: 'おはようございます。\n〇〇についてお聞きしたいです。',
        senderUID: receiver,
        sendAt: new Date('2025-01-12 10:00:00'),
    }),
    dummyTextMessage({
        content: 'おはようございます。どのようなご用件でしょうか。',
        senderUID: currentUserUID,
        readAt: new Date(),
        sendAt: new Date('2025-01-12 10:10:00'),
    }),
    dummyTextMessage({
        content:
            '先日の〇〇ですが、〇〇になります。\n可能なら資料などをいただきたいのですが、よろしいでしょうか？',
        senderUID: receiver,
        sendAt: new Date('2025-01-12 10:11:00'),
    }),
    dummyTextMessage({
        content: '加えて明日の⚪︎時に打ち合わせをお願いします。',
        senderUID: receiver,
        sendAt: new Date('2025-01-12 10:11:10'),
    }),
    dummyTextMessage({
        content: '承知しました。資料をお送りしますので少々お待ちください。',
        senderUID: currentUserUID,
        sendAt: new Date('2025-01-12 10:13:00'),
    }),
    dummyPhotoMessage({
        content: dummy150,
        sendAt: new Date('2025-01-12 10:28:00'),
    }),
    dummyTextMessage({
        content:
            '資料をお送りしましたのでダウンロードして確認いただけますでしょうか？その他ご質問があればお気軽にお知らせください。',
        senderUID: currentUserUID,
        sendAt: new Date('2025-01-12 10:28:50'),
    }),
    dummyTextMessage({
        content:
            'ありがとうございます。確認させていただきます。\nまた、追加の質問を記載しましたので以下のファイルを確認をお願いします。',
        senderUID: receiver,
        sendAt: new Date('2025-01-13 09:00:00'),
    }),
    dummyPhotoMessage({
        content: dummy800150,
        senderUID: receiver,
        sendAt: new Date('2025-01-13 09:05:00'),
    }),
    dummyTextMessage({
        content: '確認いたします。よろしくお願いいたします。',
        senderUID: currentUserUID,
        readAt: null,
        sendAt: new Date('2025-01-14 07:00:00'),
    }),
    dummyTextMessage({
        content: '確認いたしました。時間の良い時にお電話よろしいでしょうか？',
        senderUID: currentUserUID,
        readAt: null,
        sendAt: new Date(),
    }),
    dummyPhotoMessage({
        content: dummy150700,
        senderUID: receiver,
        sendAt: new Date(),
    }),
];
