import { ChatroomType } from '@admin/domain/chat/models/ChatroomType';
import { Admin } from '@admin/domain/admin/model';

export const messageCollectionPath = (chatroom: ChatroomType) => {
    return `${chatroom.contractKey}/chat/messages`;
};

export const summaryCollectionPath = (admin: Admin) => {
    return `${admin.contractKey}/chat/summaries`;
};
