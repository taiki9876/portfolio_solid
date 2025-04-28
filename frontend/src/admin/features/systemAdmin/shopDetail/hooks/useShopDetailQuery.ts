import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { Shop } from '@admin/domain/shop/model';

export const useShopDetailQuery = (contractId: string | undefined, shopId: string | undefined) => {
    const { data, isPending } = useQuery<Shop, AxiosError>({
        queryKey: queryKeys.shopDetail(Number(contractId), Number(shopId)),
        queryFn: async () => {
            return await ApiEndpoint.systemAdmin.fetchShop(Number(contractId), Number(shopId));
        },
        enabled: contractId !== undefined,
    });

    return { shop: data, isLoading: isPending };
};
