import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { useLoadingStore, useToastNotificationStore } from '@admin/shared/state/globalState';
import { useNavigate, useParams } from 'react-router-dom';
import { resolvePath } from '@admin/routes/type';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';

export const useManagementNoticeDeleteQuery = () => {
    const { toggleLoading } = useLoadingStore();
    const { notify } = useToastNotificationStore();
    const { noticeId } = useParams<{ noticeId: string }>();

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => ApiEndpoint.systemAdmin.deleteManagementNotice(Number(noticeId)),
        onMutate: () => {
            toggleLoading(true);
        },
        onSuccess: async () => {
            notify('運営からのお知らせを削除しました。', 'info');
            await queryClient.invalidateQueries({
                queryKey: [queryKeys.fetchManagementNotices('')[0]],
                exact: false,
            });
            toggleLoading(false);
            void navigate(
                resolvePath(SystemAdminRouteNames.managementNoticeList, {
                    noticeId: String(noticeId),
                })
            );
        },
        onError: () => {
            notify('エラーが発生しました。', 'error');
            toggleLoading(false);
        },
    });

    return {
        handleDeleteManagementNotice: () => {
            mutation.mutate();
        },
    };
};
