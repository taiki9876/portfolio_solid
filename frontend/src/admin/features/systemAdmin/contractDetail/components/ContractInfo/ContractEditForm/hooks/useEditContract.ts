import { isDeepEqual } from '@admin/shared/util/objectUtil';
import { ContractEditFormValues } from '@admin/domain/contract/form/formValue';
import {
    useLoadingStore,
    useModalStore,
    useToastNotificationStore,
} from '@admin/shared/state/globalState';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { Control } from 'react-hook-form';
import { isServerValidationError } from '@admin/shared/util/networkUtil';
import { setServerErrors } from '@admin/shared/lib/reactHookForm/useErrorHandler';

export const useEditContract = (
    contractId: number,
    control: Control<ContractEditFormValues>,
    toggleError: (forceState: boolean) => void
) => {
    const { closeModal } = useModalStore();
    const { toggleLoading } = useLoadingStore();
    const { notify } = useToastNotificationStore();

    const handleEditContract = async (data: ContractEditFormValues, completion: () => void) => {
        if (isDeepEqual(control._defaultValues, data)) {
            closeModal();
            return;
        }

        toggleLoading(true, '変更内容を反映中です。しばらくお待ちください。');
        try {
            const response = await ApiEndpoint.systemAdmin.editContract(contractId, data);

            if (isServerValidationError(response)) {
                setServerErrors(response.errors, control.setError);
                toggleError(true);
            } else {
                completion();
                notify('契約情報を更新しました。', 'info');
                closeModal();
            }
        } catch {
            notify('契約情報を更新に失敗しました。', 'error');
            closeModal();
        } finally {
            toggleLoading(false);
        }
    };

    return {
        handleEditContract,
    };
};
