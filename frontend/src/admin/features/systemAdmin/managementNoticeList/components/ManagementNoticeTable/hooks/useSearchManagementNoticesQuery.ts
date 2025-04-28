import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { useSystemAdminStore } from '@admin/features/systemAdmin/shared/systemAdminStore';
import { AdminManagementNotice } from '@admin/domain/managementNotices/model';

type SearchManagementNoticesCache = {
    notices: AdminManagementNotice[];
};
export const useSearchManagementNoticesQuery = () => {
    const searchWord = useSystemAdminStore((state) => state.managementNoticeSearchWord);
    const { data, isPending } = useQuery<SearchManagementNoticesCache, AxiosError>({
        queryKey: queryKeys.fetchManagementNotices(searchWord),
        queryFn: async () => {
            const notices = await ApiEndpoint.systemAdmin.fetchManagementNotices(searchWord);
            return {
                notices: notices,
            };
        },
        enabled: true,
        placeholderData: keepPreviousData,
    });

    return {
        notices: data === undefined ? [] : data.notices,
        isLoading: isPending,
    };
};
