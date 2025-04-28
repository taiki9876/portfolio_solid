import { useModalStore } from '@admin/shared/state/globalState';
import { useForm } from 'react-hook-form';
import {
    defaultValues,
    FormValues,
} from '@admin/features/customers/customerList/components/CustomerCreateForm/formValue';
import { CustomerCreateForm } from '@admin/features/customers/customerList/components/CustomerCreateForm';

const customerFormId = 'customerCreateForm';
export const useCreateCustomer = () => {
    const { openModal } = useModalStore();
    const { handleSubmit, control, reset, clearErrors } = useForm<FormValues>({
        defaultValues,
    });

    const handleCustomerCreateModalOpen = () => {
        openModal({
            title: '新規登録',
            formId: customerFormId,
            onOk: {
                label: '登録する',
            },
            onCancel: {
                label: 'キャンセル',
            },
            widthSize: 'medium',
            renderBody: () => (
                <CustomerCreateForm
                    formId={customerFormId}
                    handleSubmit={handleSubmit}
                    control={control}
                    resetInput={() => {
                        reset();
                        clearErrors();
                    }}
                />
            ),
        });
    };

    return {
        handleCustomerCreateModalOpen,
    };
};
