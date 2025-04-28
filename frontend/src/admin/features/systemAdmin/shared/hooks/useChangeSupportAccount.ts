import { useState } from 'react';
import { useLoadingStore, useToastNotificationStore } from '@admin/shared/state/globalState';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { redirectTo } from '@admin/shared/util/networkUtil';

export const useChangeSupportAccount = (defaultContractKey: string = '') => {
    const [key, setKey] = useState(defaultContractKey);
    const { toggleLoading } = useLoadingStore();
    const { notify } = useToastNotificationStore();

    const handleChangeAccount = async () => {
        toggleLoading(true);
        try {
            const isSuccess = await ApiEndpoint.systemAdmin.changeSupportAccount(key);
            if (!isSuccess) {
                throw new Error();
            }
            redirectTo('/admin');
        } catch (error: unknown) {
            console.log(error);
            notify('アカウントの切り替えに失敗しました。', 'error');
            toggleLoading(false);
        } finally {
            toggleLoading(false);
        }
    };

    return {
        key,
        setKey,
        handleChangeAccount,
    };
};
