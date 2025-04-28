import { useEffect } from 'react';
import { isFuture } from '@admin/shared/util/dateUtil';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { ChatroomType } from '@admin/domain/chat/models/ChatroomType';
import { MessageType } from '@admin/domain/chat/models/MessageType';
import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';

//画像や動画の署名付きURLを管理（キャッシュ）
export const useSignedUrlCache = (
    chatroom: ChatroomType | undefined,
    messages: MessageType[] | undefined
) => {
    const setSignedUrls = useInquiryStore((state) => state.setSignedUrls);
    const signedUrls = useInquiryStore((state) => state.signedUrls);

    useEffect(() => {
        const fetchUrls = async () => {
            if (messages === undefined || chatroom === undefined) {
                return;
            }

            const newMediaPaths = messages.reduce<string[]>((newPath, { contentType, content }) => {
                const cache = signedUrls[content];

                if (
                    ((contentType === 'photo' || contentType === 'video') && cache === undefined) ||
                    (cache !== undefined && !isFuture(cache.expiredAt, 'minute'))
                ) {
                    newPath.push(content);
                }
                return newPath;
            }, []);

            if (newMediaPaths.length > 0) {
                const res = await ApiEndpoint.chat.fetchSignedUrls(chatroom.id, newMediaPaths);

                setSignedUrls({ ...signedUrls, ...res });
            }
        };

        void fetchUrls();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatroom?.id, messages]);
};
