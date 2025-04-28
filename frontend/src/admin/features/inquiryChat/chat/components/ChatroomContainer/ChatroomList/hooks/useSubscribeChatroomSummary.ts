import { useEffect, useRef } from 'react';
import { useAuthStore } from '@admin/shared/state/globalState';
import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import { subscribeSummary } from '@admin/features/inquiryChat/chat/firebase/subscribeSummary';

export const useSubscribeChatroomSummary = () => {
    const _unsubscribe = useRef<() => void | undefined>(undefined);
    const { admin } = useAuthStore();
    const setChatroomSummaries = useInquiryStore((state) => state.setChatroomSummaries);

    const unsubscribeSummary = () => {
        if (_unsubscribe.current !== undefined) {
            _unsubscribe.current();
        }
    };

    useEffect(() => {
        if (admin === undefined) {
            return;
        }

        unsubscribeSummary();
        _unsubscribe.current = subscribeSummary(admin, (newSummaries) => {
            setChatroomSummaries(newSummaries);
        });

        return () => {
            unsubscribeSummary();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [admin]);
};
