import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { ManagementNotice } from '@admin/domain/managementNotices/model';

export const useFetchLatestManagementNotice = () => {
    const { data, isPending } = useQuery<ManagementNotice[], AxiosError>({
        queryKey: queryKeys.fetchManagementNoticeOfHome,
        queryFn: async () => {
            return await ApiEndpoint.home.fetchAggregateSummary();
        },
        enabled: true,
        placeholderData: keepPreviousData,
    });

    return {
        notices: data ?? [],
        isLoading: isPending,
    };
};
