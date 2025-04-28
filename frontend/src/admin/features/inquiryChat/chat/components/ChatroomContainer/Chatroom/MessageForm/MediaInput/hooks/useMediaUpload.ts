import { FormEvent } from 'react';
import { useLoadingStore, useToastNotificationStore } from '@admin/shared/state/globalState';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ChatroomType } from '@admin/domain/chat/models/ChatroomType';
import { MessageContentMediaType } from '@admin/domain/chat/models/MessageType';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { isValidMedia } from '@src/shared/validation/mediaValidator';

export const useMediaUpload = (
    currentChatroom: ChatroomType,
    media: File | undefined,
    onUploadSuccess: (uploadImagePath: string, mediaType: MessageContentMediaType) => Promise<void>
) => {
    const { notify } = useToastNotificationStore();
    const { toggleLoading } = useLoadingStore();

    const mutation = useMutation<
        { uploadPath: string; mediaType: MessageContentMediaType },
        AxiosError,
        { chatroom: ChatroomType; media: File }
    >({
        mutationFn: ({ chatroom, media }) => ApiEndpoint.chat.uploadMedia(chatroom.id, media),
        onMutate: () => {
            toggleLoading(true);
        },
        onSuccess: async ({ uploadPath, mediaType }) => {
            await onUploadSuccess(uploadPath, mediaType);
            toggleLoading(false);
        },
        onError: () => {
            notify('画像送信エラーが発生しました。', 'error');
            toggleLoading(false);
        },
    });

    const handleUploadMedia = (event: FormEvent) => {
        event.preventDefault();
        if (!isValidMedia(media)) {
            return;
        }

        mutation.mutate({
            chatroom: currentChatroom,
            media: media,
        });
    };

    return {
        handleUploadMedia,
    };
};
