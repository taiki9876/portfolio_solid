import { apiClient } from '@admin/shared/lib/axios';
import { ADMIN_API_ENDPOINT } from '@admin/env';
import { responseOk } from '@admin/shared/util/networkUtil';
import {
    ChatroomCustomerApiResource,
    ChatroomsApiResource,
    convertToChatroom,
    convertToChatroomCustomer,
} from '@admin/domain/chat/transform';
import { ChatroomStatusType, ChatroomType } from '@admin/domain/chat/models/ChatroomType';
import { SignedUrlType } from '@admin/features/inquiryChat/state/useInquiryStore';
import { MessageContentMediaType } from '@admin/domain/chat/models/MessageType';

export const chatAPiPath = {
    fetchChatrooms: `${ADMIN_API_ENDPOINT}/chat/chatrooms`,
    fetchChatroomCustomer: (chatroomId: number) =>
        `${ADMIN_API_ENDPOINT}/chat/chatrooms/${chatroomId}/customer`,
    changeStatus: (chatroomId: number) =>
        `${ADMIN_API_ENDPOINT}/chat/chatrooms/${chatroomId}/status`,
    processSend: (chatroomId: number) => {
        return `${ADMIN_API_ENDPOINT}/chat/chatrooms/${chatroomId}/messages/process-send`;
    },
    processDelete: (chatroomId: number) => {
        return `${ADMIN_API_ENDPOINT}/chat/chatrooms/${chatroomId}/messages/process-delete`;
    },
    fetchSignedUrls: (chatroomId: number) => {
        return `${ADMIN_API_ENDPOINT}/chat/chatrooms/${chatroomId}/messages/signed-urls`;
    },
    uploadMedia: (chatroomId: number) => {
        return `${ADMIN_API_ENDPOINT}/chat/chatrooms/${chatroomId}/media`;
    },
    markRead: (chatroomId: number) => {
        return `${ADMIN_API_ENDPOINT}/chat/chatrooms/${chatroomId}/messages/mark-read`;
    },
};

export type ChatroomReturnType = {
    chatrooms: ChatroomType[];
    hasMore: boolean;
};
export const chatApi = {
    fetchChatrooms: async (
        chatType: string,
        name: string,
        filterStatus: string,
        page: number,
        contractKey: string
    ): Promise<ChatroomReturnType> => {
        const params = {
            chatType,
            name,
            filterStatus,
            page,
            contractKey,
        };
        const res = await apiClient.get<{ data: ChatroomsApiResource[]; hasMore: boolean }>(
            chatAPiPath.fetchChatrooms,
            { params }
        );
        if (!responseOk(res.status)) {
            throw new Error('チャットルーム一覧の取得に失敗しました。');
        }

        const { data, hasMore } = res.data;
        return {
            chatrooms: data.map(convertToChatroom),
            hasMore,
        };
    },
    fetchChatroomCustomer: async (chatroomId: number) => {
        const res = await apiClient.get<ChatroomCustomerApiResource>(
            chatAPiPath.fetchChatroomCustomer(chatroomId)
        );
        if (!responseOk(res.status)) {
            throw new Error('会員の情報取得に失敗しました。');
        }

        return convertToChatroomCustomer(res.data);
    },
    changeStatus: async (
        chatroomId: number,
        requestStatus: ChatroomStatusType,
        isOn: boolean
    ): Promise<{ requestStatus: ChatroomStatusType; isOn: boolean }> => {
        const res = await apiClient.patch(chatAPiPath.changeStatus(chatroomId), {
            requestStatusType: requestStatus,
            isOn,
        });
        if (!responseOk(res.status)) {
            throw new Error('ステータス変更に失敗しました');
        }

        return { requestStatus, isOn };
    },
    processSend: async (chatroomId: number) => {
        const res = await apiClient.post(chatAPiPath.processSend(chatroomId));
        if (!responseOk(res.status)) {
            throw new Error('メッセージ送信：トランザクションリクエストに失敗しました。');
        }
    },
    processDelete: async (
        chatroomId: number,
        isLastMessageDeleted: boolean,
        isUnreadMessage: boolean
    ) => {
        const res = await apiClient.post(chatAPiPath.processDelete(chatroomId), {
            isLastMessageDeleted,
            isUnreadMessage,
        });
        if (!responseOk(res.status)) {
            throw new Error('メッセージ削除：トランザクションリクエストに失敗しました。');
        }
    },
    uploadMedia: async (chatroomId: number, media: File) => {
        const formData = new FormData();

        formData.append('media', media);
        const res = await apiClient.post<{ uploadPath: string; mediaType: string }>(
            chatAPiPath.uploadMedia(chatroomId),
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        if (!responseOk(res.status)) {
            throw new Error('画像の送信に失敗しました。');
        }

        const mediaType = res.data.mediaType;
        if (mediaType !== 'photo' && mediaType !== 'video') {
            throw new Error('ファイルタイプが不正です');
        }

        return {
            uploadPath: res.data.uploadPath,
            mediaType: mediaType as MessageContentMediaType,
        };
    },
    fetchSignedUrls: async (chatroomId: number, mediaPaths: string[]) => {
        const res = await apiClient.post<{ signedUrls: Record<string, SignedUrlType> }>(
            chatAPiPath.fetchSignedUrls(chatroomId),
            { mediaPaths }
        );
        if (!responseOk(res.status)) {
            throw new Error('署名つきURLの取得に失敗しました');
        }

        return res.data.signedUrls;
    },
    markRead: async (chatroomId: number) => {
        const res = await apiClient.patch(chatAPiPath.markRead(chatroomId));
        return responseOk(res.status);
    },
} as const;
