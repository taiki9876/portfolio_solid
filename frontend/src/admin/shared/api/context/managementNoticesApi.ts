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

        throw new Error('顧客情報の取得に失敗しました。');
    },
} as const;
