import { apiClient } from '@admin/shared/lib/axios';
import { ADMIN_API_ENDPOINT } from '@admin/env';
import { responseOk } from '@admin/shared/util/networkUtil';
import {
    convertToManagementNotice,
    ManagementNoticeApiResource,
} from '@admin/domain/managementNotices/transform';
import { ManagementNotice } from '@admin/domain/managementNotices/model';

export const homeAPiPath = {
    fetchAggregateSummary: `${ADMIN_API_ENDPOINT}/aggregation-summary`,
};

export const homeAPi = {
    fetchAggregateSummary: async (): Promise<ManagementNotice[]> => {
        const res = await apiClient.get<{ managementNotices: ManagementNoticeApiResource[] }>(
            homeAPiPath.fetchAggregateSummary
        );

        if (responseOk(res.status)) {
            return res.data.managementNotices.map(convertToManagementNotice);
        }

        throw new Error('トップページ：お知らせ情報の取得に失敗しました。');
    },
} as const;
