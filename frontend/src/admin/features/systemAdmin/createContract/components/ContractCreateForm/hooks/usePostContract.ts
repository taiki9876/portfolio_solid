import { useForm } from 'react-hook-form';
import { ContractCreateFormValues, defaultValues } from '@admin/domain/contract/form/formValue';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { useLoadingStore, useToastNotificationStore } from '@admin/shared/state/globalState';
import { useNavigate } from 'react-router-dom';
import { resolvePath } from '@admin/routes/type';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { useQueryClient } from '@tanstack/react-query';
import { setServerErrors, useErrorHandler } from '@admin/shared/lib/reactHookForm/useErrorHandler';
import { isServerValidationError } from '@admin/shared/util/networkUtil';

export const usePostContract = () => {
    const { toggleLoading } = useLoadingStore();
    const { notify } = useToastNotificationStore();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { apexMarker, onInputError, toggleError } = useErrorHandler();

    const { handleSubmit, control, reset, clearErrors, formState, setError } =
        useForm<ContractCreateFormValues>({
            defaultValues,
        });

    const resetInput = () => {
        reset();
        clearErrors();
    };

    const onSubmit = async (data: ContractCreateFormValues) => {
        toggleLoading(true);
        try {
            const response = await ApiEndpoint.systemAdmin.postContract(data);

            if (isServerValidationError(response)) {
                setServerErrors(response.errors, setError);
                toggleError(true);
            } else {
                notify('契約を追加しました。', 'info');
                toggleLoading(false);
                await queryClient.invalidateQueries({
                    queryKey: [queryKeys.searchContracts('')[0]],
                    exact: false,
                });
                await navigate(
                    resolvePath(SystemAdminRouteNames.contractDetail, {
                        contractId: String(response),
                    })
                );
            }
        } catch (error: unknown) {
            console.error(error);
            notify('契約の追加に失敗しました。', 'error');
        } finally {
            toggleLoading(false);
        }
    };

    return {
        submitHandler: handleSubmit(onSubmit, onInputError),
        control,
        resetInput,
        hasError: Object.keys(formState.errors).length > 0,
        apexMarker,
    };
};
