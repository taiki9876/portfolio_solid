import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { AdminManagementNotice } from '@admin/domain/managementNotices/model';

type ManagementDetailInfo = {
    notice: AdminManagementNotice;
};
export const useManagementNoticeDetailQuery = (noticeId: string | undefined) => {
    const { data, isPending } = useQuery<ManagementDetailInfo, AxiosError>({
        queryKey: queryKeys.managementNoticesDetail(Number(noticeId)),
        queryFn: async () => {
            return {
                notice: await ApiEndpoint.systemAdmin.fetchManagementNotice(Number(noticeId)),
            };
        },
        enabled: noticeId !== undefined,
    });

    return { notice: data?.notice, isLoading: isPending };
};
