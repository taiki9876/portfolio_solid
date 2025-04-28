import { useEffect } from 'react';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { useAuthStore, useLoadingStore } from '@admin/shared/state/globalState';
import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import { mSecondsFrom } from '@admin/shared/util/numberUtil';
import type { InfiniteData, QueryKey } from '@tanstack/query-core';
import { ChatroomType } from '@admin/domain/chat/models/ChatroomType';

type ChatroomQueryReturnType = { chatrooms: ChatroomType[]; nextPage?: number };
export const useSearchChatroomsQuery = () => {
    const { admin } = useAuthStore();
    const searchCondition = useInquiryStore((state) => state.searchCondition);
    const { toggleLoading } = useLoadingStore();

    const { data, isPending, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery<
        ChatroomQueryReturnType,
        AxiosError,
        InfiniteData<ChatroomQueryReturnType>,
        QueryKey,
        number
    >({
        // eslint-disable-next-line @tanstack/query/exhaustive-deps
        queryKey: queryKeys.searchChatrooms(
            searchCondition.chatType,
            searchCondition.name ?? '',
            searchCondition.status
        ),
        queryFn: async ({ pageParam = 1 }) => {
            const { chatrooms, hasMore } = await ApiEndpoint.chat.fetchChatrooms(
                searchCondition.chatType,
                searchCondition.name ?? '',
                searchCondition.status,
                pageParam,
                admin!.contractKey
            );

            return { chatrooms, nextPage: hasMore ? pageParam + 1 : undefined };
        },
        getNextPageParam: (lastData) => lastData.nextPage,
        enabled: admin !== undefined,
        placeholderData: keepPreviousData,
        initialPageParam: 1,
        staleTime: mSecondsFrom(5, 'minute'),
    });

    useEffect(() => {
        toggleLoading(isPending);
    }, [isPending, toggleLoading]);

    return {
        chatrooms: data?.pages.flatMap((page) => page.chatrooms) ?? [],
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isPending,
    };
};
