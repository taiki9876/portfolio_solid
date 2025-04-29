import { useEffect } from 'react';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { ManagementNotice } from '@admin/domain/managementNotices/model';
import { useOpenNotice } from '@admin/shared/components/Ui/Modal/NoticeModal/useOpenNotice';
import { formatDate } from '@admin/shared/util/dateUtil';
import { Admin, isSystemAdmin } from '@admin/domain/admin/model';

type SearchUnreadManagementNoticesCash = {
    notice: ManagementNotice;
    hasUnread: boolean;
};
export const useUnreadManagementNoticeQuery = (admin: Admin) => {
    const { handleOpenNotice } = useOpenNotice();
    const isEnabled = admin !== undefined && !isSystemAdmin(admin);

    const { data } = useQuery<SearchUnreadManagementNoticesCash, AxiosError>({
        queryKey: queryKeys.fetchUnreadManagementNotice(admin?.id),
        queryFn: async () => {
            return await ApiEndpoint.managementNotices.fetchUnreadManagementNotices();
        },
        enabled: isEnabled,
    });

    useEffect(() => {
        if (data?.notice === undefined || data?.notice === null) {
            return;
        }

        const notice = data.notice;
        handleOpenNotice(
            notice.title,
            notice.content,
            formatDate(notice.publishedAt, { withTime: true }),
            {
                label: '既読にする',
                onClick: () => {
                    alert('TODO: 既読');
                },
            }
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
};
