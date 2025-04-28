import { FormEventHandler } from 'react';
import { Control, Controller, SubmitHandler } from 'react-hook-form';
import { useLoadingStore, useToastNotificationStore } from '@admin/shared/state/globalState';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { Validation } from '@admin/shared/lib/reactHookForm/validation';
import { TextArea } from '@admin/shared/components/Ui/Form';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';

export type MemoFormValue = {
    memo: string;
};
export const formId = 'customerMemoForm';
type Props = {
    customerId: string;
    chatroomId: number;
    handleSubmit: (onValid: SubmitHandler<MemoFormValue>) => FormEventHandler<HTMLFormElement>;
    control: Control<MemoFormValue>;
    closeModal: () => void;
};
export const MemoForm = ({ customerId, chatroomId, handleSubmit, control, closeModal }: Props) => {
    const { toggleLoading } = useLoadingStore();
    const { notify } = useToastNotificationStore();
    const queryClient = useQueryClient();

    const onSubmit = async (data: MemoFormValue) => {
        toggleLoading(true);
        try {
            await ApiEndpoint.customers.updateMemo(customerId, data.memo);
            await queryClient.invalidateQueries({
                queryKey: queryKeys.fetchChatroomCustomer(chatroomId),
                exact: true,
            });
            notify('メモを保存しました', 'info');
        } catch {
            notify('メモの保存に失敗しました', 'error');
            toggleLoading(false);
            return;
        } finally {
            toggleLoading(false);
            closeModal();
        }
    };

    return (
        <form id={formId} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="memo"
                control={control}
                rules={{ maxLength: Validation.maxLength(2000) }}
                render={({ field, fieldState }) => (
                    <TextArea
                        value={field.value}
                        onChange={field.onChange}
                        rows={8}
                        error={fieldState.error}
                    />
                )}
            />
        </form>
    );
};
