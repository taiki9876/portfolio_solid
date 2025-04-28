import { useForm } from 'react-hook-form';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { useLoadingStore, useToastNotificationStore } from '@admin/shared/state/globalState';
import { setServerErrors, useErrorHandler } from '@admin/shared/lib/reactHookForm/useErrorHandler';
import { ShopFormValues, defaultValues } from '@admin/domain/shop/form/formValue';
import { useNavigate, useParams } from 'react-router-dom';
import { isServerValidationError } from '@admin/shared/util/networkUtil';
import { resolvePath } from '@admin/routes/type';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';

export const usePostShop = () => {
    const { toggleLoading } = useLoadingStore();
    const { notify } = useToastNotificationStore();
    const { contractId } = useParams<{ contractId: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { apexMarker, onInputError, toggleError } = useErrorHandler();

    const { handleSubmit, control, reset, clearErrors, formState, setError } =
        useForm<ShopFormValues>({
            defaultValues,
        });

    const resetInput = () => {
        reset();
        clearErrors();
    };

    const onSubmit = async (data: ShopFormValues) => {
        toggleLoading(true);

        try {
            const response = await ApiEndpoint.systemAdmin.postShop(Number(contractId), data);

            if (isServerValidationError(response)) {
                setServerErrors(response.errors, setError);
                toggleError(true);
            } else {
                notify('店舗を追加しました。', 'info');
                toggleLoading(false);
                await queryClient.invalidateQueries({
                    queryKey: [queryKeys.searchShops(0, '')[0]],
                    exact: false,
                });
                await queryClient.invalidateQueries({
                    queryKey: [queryKeys.searchContracts('')[0]],
                    exact: false,
                });
                await queryClient.invalidateQueries({
                    queryKey: queryKeys.contractDetail(Number(contractId)),
                    exact: true,
                });
                await navigate(
                    resolvePath(SystemAdminRouteNames.shopDetail, {
                        contractId: String(contractId),
                        shopId: String(response),
                    })
                );
            }
        } catch (error: unknown) {
            console.error(error);
            notify('店舗の追加に失敗しました。', 'error');
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
