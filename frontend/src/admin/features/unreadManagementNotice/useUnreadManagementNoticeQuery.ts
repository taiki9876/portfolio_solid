import { useEffect } from 'react';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { ManagementNotice } from '@admin/domain/managementNotices/model';
import { useOpenNotice } from '@admin/shared/components/Ui/Modal/NoticeModal/useOpenNotice';
import { formatDate } from '@admin/shared/util/dateUtil';

type SearchUnreadManagementNoticesCash = {
    notice: ManagementNotice;
    hasUnread: boolean;
};
export const useUnreadManagementNoticeQuery = () => {
    const { handleOpenNotice } = useOpenNotice();
    const { data } = useQuery<SearchUnreadManagementNoticesCash, AxiosError>({
        queryKey: queryKeys.fetchUnreadManagementNotice(),
        queryFn: async () => {
            return await ApiEndpoint.managementNotices.fetchUnreadManagementNotices();
        },
        enabled: true,
    });

    useEffect(() => {
        if (data?.notice === undefined || data?.notice === null) {
            return;
        }

        const notice = data.notice;
        handleOpenNotice(
            notice.title,
            notice.content,
            formatDate(notice.publishedAt, { withTime: true })
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
};
