import { useEffect, useLayoutEffect, useRef } from 'react';
import { SmallLoading } from '@admin/shared/components/Ui/Loading/SmallLoading';
import { useInView } from '@src/shared/hooks/useInView';
import { mSecondsFrom } from '@admin/shared/util/numberUtil';
import { MessageType } from '@admin/domain/chat/models/MessageType';

type Props = {
    hasMore: boolean;
    loadMoreMessages: () => void;
    messages: MessageType[];
    rootRef: Element | null;
};
export const LoadMoreArea = ({ hasMore, loadMoreMessages, messages, rootRef }: Props) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const prevDistanceFromBottomRef = useRef(0);
    const { ref, isIn, resetInView } = useInView({
        options: { root: rootRef, rootMargin: '700px 0px 0px 0px', threshold: 0.8 },
    });

    const handleLoadMore = () => {
        if (rootRef !== null) {
            // NOTE: 追加読み込みの際の画面のガタつき対策、スクロール位置を保持する。useLayoutEffectで利用
            prevDistanceFromBottomRef.current = rootRef.scrollHeight - rootRef.scrollTop;
        }
        loadMoreMessages();
    };

    useEffect(() => {
        if (isIn && hasMore) {
            if (timerRef.current !== null) {
                clearTimeout(timerRef.current);
            }
            handleLoadMore();
            timerRef.current = setTimeout(
                () => {
                    resetInView();
                },
                mSecondsFrom(2, 'second')
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isIn]);

    useLayoutEffect(() => {
        if (rootRef === null || messages.length === 0) return;

        rootRef.scrollTop = rootRef.scrollHeight - prevDistanceFromBottomRef.current;
        prevDistanceFromBottomRef.current = 0;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages.length]);

    return (
        <>
            {hasMore && (
                <div style={{ height: '30px' }}>
                    <SmallLoading />
                </div>
            )}

            <div style={{ height: '10px', width: '100%' }} ref={ref} />
        </>
    );
};
