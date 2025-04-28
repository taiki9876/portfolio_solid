import { isDeepEqual } from '@admin/shared/util/objectUtil';
import {
    useLoadingStore,
    useModalStore,
    useToastNotificationStore,
} from '@admin/shared/state/globalState';
import { Control } from 'react-hook-form';
import { ManagementNoticeFormValues } from '@admin/domain/managementNotices/form/formValue';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { isServerValidationError } from '@admin/shared/util/networkUtil';
import { setServerErrors } from '@admin/shared/lib/reactHookForm/useErrorHandler';

export const useEditManagementNotice = (
    noticeId: number,
    control: Control<ManagementNoticeFormValues>,
    toggleError: (forceState: boolean) => void
) => {
    const { closeModal } = useModalStore();
    const { toggleLoading } = useLoadingStore();
    const { notify } = useToastNotificationStore();

    const handleEditNotice = async (data: ManagementNoticeFormValues, completion: () => void) => {
        if (isDeepEqual(control._defaultValues, data)) {
            closeModal();
            return;
        }

        toggleLoading(true, '変更内容を反映中です。しばらくお待ちください。');
        try {
            const response = await ApiEndpoint.systemAdmin.editManagementNotice(noticeId, data);

            if (isServerValidationError(response)) {
                setServerErrors(response.errors, control.setError);
                toggleError(true);
            } else {
                completion();
                notify('運営からのお知らせ情報を更新しました。', 'info');
                closeModal();
            }
        } catch {
            notify('運営からのお知らせ情報の更新に失敗しました。', 'error');
            closeModal();
        } finally {
            toggleLoading(false);
        }
    };

    return {
        handleEditNotice,
    };
};
