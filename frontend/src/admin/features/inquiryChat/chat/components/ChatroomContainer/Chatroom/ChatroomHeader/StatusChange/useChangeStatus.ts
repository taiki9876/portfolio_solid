import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { AxiosError } from 'axios';
import { ChatroomStatusType, ChatroomType } from '@admin/domain/chat/models/ChatroomType';
import {
    useAuthStore,
    useLoadingStore,
    useToastNotificationStore,
} from '@admin/shared/state/globalState';
import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import { MessageType } from '@admin/domain/chat/models/MessageType';
import { Admin } from '@admin/domain/admin/model';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { forceDeleteMessage } from '@admin/features/inquiryChat/chat/firebase/deleteMessage';
import { sendProcessedMessage } from '@admin/features/inquiryChat/chat/firebase/sendMessage';
import { useChatContentContext } from '../../context/useChatContentContext';

export const useChangeStatus = () => {
    const { toggleLoading } = useLoadingStore();
    const { notify } = useToastNotificationStore();

    const { admin } = useAuthStore();
    const queryClient = useQueryClient();

    const { scrollToBottom } = useChatContentContext();
    const currentChatroom = useInquiryStore((state) => state.currentChatroom);
    const [chatroomStatus, setChatroomStatus] = useState({
        isProcessed: currentChatroom?.isProcessed ?? false,
        isSpam: currentChatroom?.isSpam ?? false,
    });

    const latestMessage = useInquiryStore((state) => state.latestMessage);

    const mutation = useMutation<
        { requestStatus: ChatroomStatusType; isOn: boolean },
        AxiosError,
        { chatroomId: number; requestStatus: ChatroomStatusType; isOn: boolean }
    >({
        mutationFn: ({ chatroomId, requestStatus, isOn }) =>
            ApiEndpoint.chat.changeStatus(chatroomId, requestStatus, isOn),
        onMutate: () => {
            toggleLoading(true);
        },
        onSuccess: async ({ requestStatus, isOn }) => {
            notify('ステータスを変更しました。', 'info');
            if (requestStatus === 'processed') {
                await processedMessageHandle(admin, currentChatroom, isOn, latestMessage?.all);
                if (isOn) {
                    scrollToBottom(true);
                }
            }

            await queryClient.invalidateQueries({
                queryKey: [queryKeys.searchChatrooms('', '', '')[0]],
                exact: false,
            });
            toggleLoading(false);
        },
        onError: () => {
            notify('エラーが発生しました。', 'error');
            toggleLoading(false);
        },
    });

    const chatroomSummaries = useInquiryStore((state) => state.chatroomSummaries);
    useEffect(() => {
        if (currentChatroom === undefined) {
            return;
        }
        const currentSummary = chatroomSummaries.find(
            (summary) => summary.chatroomId === currentChatroom.id
        );

        if (currentSummary !== undefined) {
            setChatroomStatus({
                isProcessed: currentSummary.isProcessed,
                isSpam: currentSummary.isSpam,
            });
        } else {
            setChatroomStatus({
                isProcessed: currentChatroom.isProcessed,
                isSpam: currentChatroom.isSpam,
            });
        }
    }, [chatroomSummaries, currentChatroom]);

    const handleMarkProcessed = () => {
        if (chatroomStatus.isSpam) {
            alert('スパムに指定されているため、対応フラグの変更ができません。');
            return;
        }
        if (confirm(chatroomStatus.isProcessed ? '未対応に戻しますか？' : '対応済みにしますか？')) {
            mutation.mutate({
                chatroomId: currentChatroom!.id,
                requestStatus: 'processed',
                isOn: !chatroomStatus.isProcessed,
            });
        }
    };

    const handleMarkSpam = () => {
        if (confirm(chatroomStatus.isSpam ? 'スパムを解除しますか？' : 'スパムに指定しますか？')) {
            mutation.mutate({
                chatroomId: currentChatroom!.id,
                requestStatus: 'spam',
                isOn: !chatroomStatus.isSpam,
            });
        }
    };

    return {
        handleMarkProcessed,
        handleMarkSpam,
        chatroomStatus,
    };
};

/**
 * 対応済みフラグメッセージの処理
 */
const processedMessageHandle = async (
    admin: Admin | undefined,
    chatroom: ChatroomType | undefined,
    isOn: boolean,
    latestMessage: MessageType | undefined
) => {
    if (chatroom === undefined || admin === undefined) {
        return;
    }
    const isLatestMessageIsProcessed = latestMessage?.contentType === 'processed';
    if (isLatestMessageIsProcessed && !isOn) {
        //NOTE:  最新メッセージが対応済みで、対応フラグがオフになった場合->フラグメッセ削除
        await forceDeleteMessage(chatroom, latestMessage);
        return;
    }

    if (!isLatestMessageIsProcessed && isOn) {
        //NOTE: 最新メッセージが対応済みでなく、対応フラグがオンになった場合->フラグメッセ送信
        await sendProcessedMessage(chatroom, admin);
    }
};
