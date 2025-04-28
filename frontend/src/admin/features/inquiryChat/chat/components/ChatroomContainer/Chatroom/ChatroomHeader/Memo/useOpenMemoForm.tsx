import { useEffect } from 'react';
import { useModalStore } from '@admin/shared/state/globalState';
import { useForm } from 'react-hook-form';
import { ChatroomCustomerType } from '@admin/domain/chat/models/ChatrromCustomerType';
import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import { formId, MemoForm, MemoFormValue } from './MemoForm';

export const useOpenMemoForm = (customer: ChatroomCustomerType) => {
    const { openModal, closeModal } = useModalStore();
    const { handleSubmit, control, setValue } = useForm<MemoFormValue>({
        defaultValues: { memo: customer.memo ?? '' },
    });
    const currentChatroom = useInquiryStore((state) => state.currentChatroom);

    useEffect(() => {
        setValue('memo', customer.memo ?? '');
    }, [customer, setValue]);

    const handleOpenMemo = () => {
        if (customer === undefined || currentChatroom === undefined) {
            return;
        }
        openModal({
            title: 'カルテ　お客様メモ',
            hasRequiredLabel: false,
            formId: formId,
            onOk: {
                label: '保存',
            },
            onCancel: {
                label: 'キャンセル',
            },
            widthSize: 'medium',
            renderBody: () => (
                <MemoForm
                    customerId={customer.customerId}
                    chatroomId={currentChatroom.id}
                    handleSubmit={handleSubmit}
                    control={control}
                    closeModal={closeModal}
                />
            ),
        });
    };

    return {
        handleOpenMemo,
    };
};
