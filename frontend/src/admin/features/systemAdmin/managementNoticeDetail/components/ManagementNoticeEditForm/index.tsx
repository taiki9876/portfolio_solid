import { Control } from 'react-hook-form';
import { useErrorHandler } from '@admin/shared/lib/reactHookForm/useErrorHandler';
import { ErrorBox } from '@admin/shared/components/Ui/Form/ErrorBox';
import { Row } from '@admin/shared/components/Ui/Form/ModalForm/Row';
import { InputField } from '@admin/shared/lib/reactHookForm/components/InputField';
import { ManagementNoticeFormValues } from '@admin/domain/managementNotices/form/formValue';
import { inputFields } from '@admin/domain/managementNotices/form/formFieldDefinition';
import { usePreventEnterSubmit } from '@src/shared/hooks/usePreventEnterSubmit';
import { useEditManagementNotice } from './hooks/useEditManagementNotice';

type Props = {
    formId: string;
    noticeId: number;
    control: Control<ManagementNoticeFormValues>;
    resetInput: (withQueryCacheClear: boolean) => void;
};
export const ManagementNoticeEditForm = ({ formId, noticeId, control, resetInput }: Props) => {
    const { apexMarker, hasError, onInputError, toggleError } = useErrorHandler();
    const { handleEditNotice } = useEditManagementNotice(noticeId, control, toggleError);
    const onKeyDown = usePreventEnterSubmit();

    const onSubmit = (data: ManagementNoticeFormValues) => {
        void handleEditNotice(data, () => resetInput(true));
    };

    return (
        <>
            <div ref={apexMarker} />
            {hasError && <ErrorBox messages={['入力内容を再度ご確認ください。']} />}
            <form
                id={formId}
                onSubmit={control.handleSubmit(onSubmit, onInputError)}
                onKeyDown={onKeyDown}
            >
                {inputFields.map((input) => (
                    <Row key={input.name}>
                        <InputField key={input.name} input={input} control={control} mode="edit" />
                    </Row>
                ))}
            </form>
        </>
    );
};
