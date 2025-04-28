import { apiClient } from '@admin/shared/lib/axios';
import { ADMIN_API_ENDPOINT } from '@admin/env';
import { responseOk } from '@admin/shared/util/networkUtil';
import { convertToCustomer, CustomerApiResource } from '@admin/domain/customer/transform';
import { convertToPageMeta, PageMetaApiResource } from '@admin/domain/pagination/transform';

export const customerApiPath = {
    fetchCustomers: `${ADMIN_API_ENDPOINT}/customers`,
    downloadCustomers: `${ADMIN_API_ENDPOINT}/customers/download`,
    updateMemo: `${ADMIN_API_ENDPOINT}/customers/memo`,
};
export const customersApi = {
    fetchCustomers: async (searchWord: string, perPage: number, page: number) => {
        const res = await apiClient.get<{ data: CustomerApiResource[]; meta: PageMetaApiResource }>(
            customerApiPath.fetchCustomers,
            {
                params: {
                    searchWord,
                    page,
                    perPage,
                },
            }
        );

        if (responseOk(res.status)) {
            const responseData = res.data;
            return {
                customers: responseData.data.map(convertToCustomer),
                pageMeta: convertToPageMeta(responseData.meta),
            };
        }

        throw new Error('顧客情報の取得に失敗しました。');
    },
    downloadCustomers: async (): Promise<boolean> => {
        const res = await apiClient.get<Blob | MediaSource>(customerApiPath.downloadCustomers, {
            responseType: 'blob',
        });

        if (responseOk(res.status)) {
            // Blobデータをダウンロード
            const url = URL.createObjectURL(res.data);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'customers.csv';
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
            return true;
        }

        throw new Error('顧客情報のダウンロードに失敗しました。');
    },
    updateMemo: async (customerId: string, memo: string) => {
        const res = await apiClient.patch(customerApiPath.updateMemo, {
            customerId,
            memo,
        });

        if (responseOk(res.status)) {
            return true;
        }

        throw new Error('メモの更新に失敗しました。');
    },
} as const;
