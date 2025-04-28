import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { ChatroomCustomerType } from '@admin/domain/chat/models/ChatrromCustomerType';
import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';

export const useFetchCustomerQuery = () => {
    const currentChatroom = useInquiryStore((state) => state.currentChatroom);

    const { data, isPending } = useQuery<ChatroomCustomerType, AxiosError>({
        queryKey: queryKeys.fetchChatroomCustomer(currentChatroom?.id ?? 0),
        queryFn: async () => {
            return await ApiEndpoint.chat.fetchChatroomCustomer(currentChatroom?.id ?? 0);
        },
        enabled: Boolean(currentChatroom?.id),
        // placeholderData: keepPreviousData,
    });
    return { customer: data, isLoading: isPending };
};
