import { apiClient } from '@admin/shared/lib/axios';
import { ADMIN_API_ENDPOINT } from '@admin/env';
import { responseOk } from '@admin/shared/util/networkUtil';
import { convertToPageMeta, PageMetaApiResource } from '@admin/domain/pagination/transform';
import {
    convertToManagementNotice,
    ManagementNoticeApiResource,
} from '@admin/domain/managementNotices/transform';

export const managementNoticesApiPath = {
    fetchManagementNotices: `${ADMIN_API_ENDPOINT}/management-notices`,
    fetchUnreadManagementNotice: `${ADMIN_API_ENDPOINT}/management-notices/unread`,
    readUnreadManagementNotice: `${ADMIN_API_ENDPOINT}/management-notices/read`,
};
export const managementNoticesApi = {
    fetchManagementNotices: async (perPage: number, page: number) => {
        const res = await apiClient.get<{
            data: ManagementNoticeApiResource[];
            meta: PageMetaApiResource;
        }>(managementNoticesApiPath.fetchManagementNotices, {
            params: {
                page,
                perPage,
            },
        });

        if (responseOk(res.status)) {
            const responseData = res.data;
            return {
                notices: responseData.data.map(convertToManagementNotice),
                pageMeta: convertToPageMeta(responseData.meta),
            };
        }

        throw new Error('運営からのお知らせの取得に失敗しました。');
    },
    fetchUnreadManagementNotices: async () => {
        const res = await apiClient.get<{
            data: ManagementNoticeApiResource;
            hasUnread: boolean;
        }>(managementNoticesApiPath.fetchUnreadManagementNotice);

        if (responseOk(res.status)) {
            const responseData = res.data;
            return {
                notice: convertToManagementNotice(responseData.data),
                hasUnread: responseData.hasUnread,
            };
        }

        throw new Error('未読の運営からのお知らせの取得に失敗しました。');
    },
    readUnreadManagementNotices: async (noticeId: number) => {
        const res = await apiClient.post(managementNoticesApiPath.readUnreadManagementNotice, {
            managementNoticeId: noticeId,
        });

        if (!responseOk(res.status)) {
            throw new Error('既読に失敗しました');
        }

        return true;
    },
} as const;
