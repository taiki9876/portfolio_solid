import {
    useLoadingStore,
    useModalStore,
    useToastNotificationStore,
} from '@admin/shared/state/globalState';
import { FormValues } from '../formValue';

export const useCreateCustomer = () => {
    const { notify } = useToastNotificationStore();
    const { closeModal } = useModalStore();
    const { toggleLoading } = useLoadingStore();

    const doApi = () => {
        //API通信を模擬的に表現するPromise
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('success');
            }, 3000);
        });
    };

    const handleCreateCustomer = async (data: FormValues, completion: () => void) => {
        console.log(data);
        toggleLoading(true, '会員を登録中です。しばらくお待ちください。');

        try {
            await doApi();
            notify('会員を登録しました。(現在は未実装です)', 'info');
        } catch {
            notify('会員の登録に失敗しました。', 'error');
        } finally {
            toggleLoading(false);
            completion();
            closeModal();
        }
    };
    return {
        handleCreateCustomer,
    };
};
