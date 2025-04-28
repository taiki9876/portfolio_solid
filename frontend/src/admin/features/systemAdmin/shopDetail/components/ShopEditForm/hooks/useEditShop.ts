import { isDeepEqual } from '@admin/shared/util/objectUtil';
import {
    useLoadingStore,
    useModalStore,
    useToastNotificationStore,
} from '@admin/shared/state/globalState';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { Control } from 'react-hook-form';
import { isServerValidationError } from '@admin/shared/util/networkUtil';
import { setServerErrors } from '@admin/shared/lib/reactHookForm/useErrorHandler';
import { ShopFormValues } from '@admin/domain/shop/form/formValue';

export const useEditShop = (
    contractId: number,
    shopId: number,
    control: Control<ShopFormValues>,
    toggleError: (forceState: boolean) => void
) => {
    const { closeModal } = useModalStore();
    const { toggleLoading } = useLoadingStore();
    const { notify } = useToastNotificationStore();

    const handleEditShop = async (data: ShopFormValues, completion: () => void) => {
        if (isDeepEqual(control._defaultValues, data)) {
            closeModal();
            return;
        }

        toggleLoading(true, '変更内容を反映中です。しばらくお待ちください。');
        try {
            //NOTE: imagesの中の値は変更されているが、images[0]..[4] の値がなぜか変わらないため対応（不要なデータのため削除）
            [0, 1, 2, 3, 4].forEach((i) => {
                delete data[`images[${i}]` as keyof ShopFormValues];
            });

            const response = await ApiEndpoint.systemAdmin.editShop(contractId, shopId, data);

            if (isServerValidationError(response)) {
                setServerErrors(response.errors, control.setError);
                toggleError(true);
            } else {
                completion();
                notify('店舗情報を更新しました。', 'info');
                closeModal();
            }
        } catch {
            notify('店舗情報の更新に失敗しました。', 'error');
            closeModal();
        } finally {
            toggleLoading(false);
        }
    };

    return {
        handleEditShop,
    };
};
