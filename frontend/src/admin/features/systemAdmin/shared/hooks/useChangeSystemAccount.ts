import { useLoadingStore, useToastNotificationStore } from '@admin/shared/state/globalState';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { RedirectPath, redirectTo } from '@admin/shared/util/networkUtil';

export const useChangeSystemAccount = () => {
    const { toggleLoading } = useLoadingStore();
    const { notify } = useToastNotificationStore();

    const handleChangeAccount = async () => {
        toggleLoading(true);
        try {
            const isSuccess = await ApiEndpoint.systemAdmin.changeSystemAccount();
            if (!isSuccess) {
                throw new Error();
            }
            redirectTo(RedirectPath.SystemAdminContractsPage);
        } catch {
            notify('システム管理者へのアカウントの切り替えに失敗しました。', 'error');
            toggleLoading(false);
        } finally {
            toggleLoading(false);
        }
    };

    return {
        handleChangeAccount,
    };
};
