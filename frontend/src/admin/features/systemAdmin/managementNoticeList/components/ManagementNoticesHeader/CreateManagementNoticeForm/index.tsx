import { Control } from 'react-hook-form';
import { ErrorBox } from '@admin/shared/components/Ui/Form/ErrorBox';
import { Row } from '@admin/shared/components/Ui/Form/ModalForm/Row';
import { InputField } from '@admin/shared/lib/reactHookForm/components/InputField';
import { ManagementNoticeFormValues } from '@admin/domain/managementNotices/form/formValue';
import { inputFields } from '@admin/domain/managementNotices/form/formFieldDefinition';
import { usePreventEnterSubmit } from '@src/shared/hooks/usePreventEnterSubmit';
import { useCreateManagementNotice } from './useCreateManagementNotice';

type Props = {
    formId: string;
    control: Control<ManagementNoticeFormValues>;
    onCreateEnd: (noticeId: number) => void;
};
export const CreateManagementNoticeForm = ({ formId, control, onCreateEnd }: Props) => {
    const { onSubmit, onInputError, apexMarker, hasError } = useCreateManagementNotice(
        control,
        onCreateEnd
    );
    const onKeyDown = usePreventEnterSubmit();

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
                        <InputField input={input} control={control} mode="create" />
                    </Row>
                ))}
            </form>
        </>
    );
};
