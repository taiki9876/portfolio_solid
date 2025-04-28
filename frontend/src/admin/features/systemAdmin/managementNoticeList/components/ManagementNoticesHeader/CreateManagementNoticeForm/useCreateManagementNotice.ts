import { Control } from 'react-hook-form';
import { useLoadingStore, useToastNotificationStore } from '@admin/shared/state/globalState';
import { setServerErrors, useErrorHandler } from '@admin/shared/lib/reactHookForm/useErrorHandler';
import { ManagementNoticeFormValues } from '@admin/domain/managementNotices/form/formValue';
import { useQueryClient } from '@tanstack/react-query';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { isServerValidationError } from '@admin/shared/util/networkUtil';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';

export const useCreateManagementNotice = (
    control: Control<ManagementNoticeFormValues>,
    onCreateEnd: (noticeId: number) => void
) => {
    const { toggleLoading } = useLoadingStore();
    const { notify } = useToastNotificationStore();
    const queryClient = useQueryClient();

    const { apexMarker, onInputError, hasError, toggleError } = useErrorHandler();

    const onSubmit = async (data: ManagementNoticeFormValues) => {
        toggleLoading(true);
        try {
            const response = await ApiEndpoint.systemAdmin.postManagementNotice(data);
            if (isServerValidationError(response)) {
                setServerErrors(response.errors, control.setError);
                toggleError(true);
            } else {
                notify('運営からのお知らせを追加しました。', 'info');
                toggleLoading(false);
                await queryClient.invalidateQueries({
                    queryKey: [queryKeys.fetchManagementNotices('')[0]],
                    exact: false,
                });
                onCreateEnd(response as number);
            }
        } catch (error: unknown) {
            console.error(error);
            notify('お知らせの追加に失敗しました。', 'error');
        } finally {
            toggleLoading(false);
        }
    };

    return {
        onSubmit,
        onInputError,
        apexMarker,
        hasError,
    };
};
