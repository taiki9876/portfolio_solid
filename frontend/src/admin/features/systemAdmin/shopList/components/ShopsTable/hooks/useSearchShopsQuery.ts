import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { useParams } from 'react-router-dom';
import { useSystemAdminStore } from '@admin/features/systemAdmin/shared/systemAdminStore';
import { RowType } from '@admin/shared/components/Ui/Table/TableRow';
import { createRows } from '../header';

type SearchContractsCash = {
    shops: RowType[];
};
export const useSearchShopsQuery = () => {
    const searchWord = useSystemAdminStore((state) => state.shopSearchWord);
    const { contractId } = useParams<{ contractId: string }>();

    const { data, isPending } = useQuery<SearchContractsCash, AxiosError>({
        queryKey: queryKeys.searchShops(Number(contractId), searchWord),
        queryFn: async () => {
            const shops = await ApiEndpoint.systemAdmin.fetchShops(Number(contractId), searchWord);
            return {
                shops: createRows(shops),
            };
        },
        enabled: true,
        placeholderData: keepPreviousData,
    });

    return {
        shops: data === undefined ? [] : data.shops,
        isLoading: isPending,
    };
};
