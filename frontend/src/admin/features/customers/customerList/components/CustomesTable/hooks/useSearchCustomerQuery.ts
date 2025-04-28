import { useEffect } from 'react';
import { useCustomerStore } from '@admin/features/customers/state/useCustomerStore';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { DefaultPaginationMeta, PaginationMeta } from '@admin/domain/pagination/model';
import { RowType } from '@admin/shared/components/Ui/Table/TableRow';
import { useSetSearchParams } from '@src/shared/hooks/useSyncSearchParams';
import { isDeepEqual } from '@admin/shared/util/objectUtil';

type SearchCustomerCash = {
    customers: RowType[];
    pageMeta: PaginationMeta;
};
export const useSearchCustomerQuery = () => {
    const searchWord = useCustomerStore((state) => state.searchWord);
    const paginationMeta = useCustomerStore((state) => state.pageMeta);
    const setPageMeta = useCustomerStore((state) => state.setPageMeta);
    const { setUrlParams } = useSetSearchParams();

    const { data, isPending } = useQuery<SearchCustomerCash, AxiosError>({
        queryKey: queryKeys.searchCustomer(paginationMeta.perPage, paginationMeta.page, searchWord),
        queryFn: async () => {
            const { customers, pageMeta } = await ApiEndpoint.customers.fetchCustomers(
                searchWord,
                paginationMeta.perPage,
                paginationMeta.page
            );
            return {
                customers: customers.map((customer) => ({
                    id: customer.customerCode,
                    values: Object.values(customer),
                })),
                pageMeta: pageMeta,
            };
        },
        enabled: true,
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (data?.pageMeta === undefined) {
            return;
        }
        const meta = data.pageMeta;
        setPageMeta(meta);

        if (!isDeepEqual(DefaultPaginationMeta, meta)) {
            setUrlParams([
                { key: 'page', value: meta.page },
                { key: 'perPage', value: meta.perPage },
            ]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.pageMeta, setPageMeta]);

    return {
        customers: data === undefined ? [] : data.customers,
        isLoading: isPending,
        paginationMeta,
        setPageMeta,
    };
};
