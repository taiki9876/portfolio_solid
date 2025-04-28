import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { useLoadingStore, useToastNotificationStore } from '@admin/shared/state/globalState';
import { useNavigate, useParams } from 'react-router-dom';
import { resolvePath } from '@admin/routes/type';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';

export const useShopDeleteQuery = () => {
    const { toggleLoading } = useLoadingStore();
    const { notify } = useToastNotificationStore();
    const { contractId, shopId } = useParams<{ contractId: string; shopId: string }>();

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => ApiEndpoint.systemAdmin.deleteShop(Number(contractId), Number(shopId)),
        onMutate: () => {
            toggleLoading(true);
        },
        onSuccess: async () => {
            notify('店舗を削除しました。', 'info');
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.searchShops(0, '')[0]],
                exact: false,
            });
            toggleLoading(false);
            void navigate(
                resolvePath(SystemAdminRouteNames.shopList, { contractId: String(contractId) })
            );
        },
        onError: () => {
            notify('エラーが発生しました。', 'error');
            toggleLoading(false);
        },
    });

    return {
        handleDeleteShop: () => {
            mutation.mutate();
        },
    };
};
