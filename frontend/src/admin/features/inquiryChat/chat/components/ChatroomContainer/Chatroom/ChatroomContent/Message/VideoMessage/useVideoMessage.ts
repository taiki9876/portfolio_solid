import { useEffect, useState } from 'react';
import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import NoImage from '@admin/assets/images/noimage.png';
import { MessageType } from '@admin/domain/chat/models/MessageType';

export const useVideoMessage = (message: MessageType) => {
    const [src, setSrc] = useState<string | undefined>(undefined);
    const [isNoImage, setIsNoImage] = useState(false);
    const signedUrls = useInquiryStore((state) => state.signedUrls);

    useEffect(() => {
        const cache = signedUrls[message.content];

        if (cache === undefined) {
            return;
        }

        if (cache.signedUrl === null) {
            setSrc(NoImage);
            setIsNoImage(true);
        } else {
            setSrc(cache.signedUrl);
            setIsNoImage(false);
        }
    }, [message.content, signedUrls]);

    return {
        src,
        isNoImage,
    };
};
