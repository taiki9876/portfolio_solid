import { useLoadingStore, useToastNotificationStore } from '@admin/shared/state/globalState';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';

export const useDownloadCustomers = () => {
    const { toggleLoading } = useLoadingStore();
    const { notify } = useToastNotificationStore();

    const handleDownload = async () => {
        toggleLoading(true, '集計中です。しばらくお待ちください。');
        try {
            await ApiEndpoint.customers.downloadCustomers();
        } catch {
            notify('会員情報のダウンロードに失敗しました。', 'error');
        } finally {
            toggleLoading(false);
        }
    };

    return {
        handleDownload,
    };
};
