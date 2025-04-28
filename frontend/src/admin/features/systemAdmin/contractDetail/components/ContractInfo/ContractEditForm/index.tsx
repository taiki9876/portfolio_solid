import { Control } from 'react-hook-form';
import { ContractEditFormValues } from '@admin/domain/contract/form/formValue';
import { useErrorHandler } from '@admin/shared/lib/reactHookForm/useErrorHandler';
import { ErrorBox } from '@admin/shared/components/Ui/Form/ErrorBox';
import {
    inputOfAdditional,
    inputOfContract,
    inputOfInCharge,
} from '@admin/domain/contract/form/formFieldDefinition';
import { Row } from '@admin/shared/components/Ui/Form/ModalForm/Row';
import { FormInputType, InputField } from '@admin/shared/lib/reactHookForm/components/InputField';
import { isLabelWithKeyType } from '@src/shared/type';
import { SectionTitle } from '@admin/shared/components/Ui/Form/ModalForm/SectionTitle';
import { Separator } from '@admin/shared/components/Ui/Separator';
import { useEditContract } from './hooks/useEditContract';

type Props = {
    formId: string;
    contractId: number;
    control: Control<ContractEditFormValues>;
    resetInput: (withQueryCacheClear: boolean) => void;
};
export const ContractEditForm = ({ formId, contractId, control, resetInput }: Props) => {
    const { apexMarker, hasError, onInputError, toggleError } = useErrorHandler();
    const { handleEditContract } = useEditContract(contractId, control, toggleError);

    const onSubmit = (data: ContractEditFormValues) => {
        void handleEditContract(data, () => resetInput(true));
    };

    return (
        <>
            <div ref={apexMarker} />
            {hasError && <ErrorBox messages={['入力内容を再度ご確認ください。']} />}
            <form id={formId} onSubmit={control.handleSubmit(onSubmit, onInputError)}>
                {[
                    { key: 'label_contract', label: '契約情報' },
                    ...inputOfContract,
                    'separator',
                    { key: 'label_person', label: '担当者様 情報' },
                    ...inputOfInCharge,
                    'separator',
                    { key: 'label_other', label: 'その他' },
                    ...inputOfAdditional,
                ].map((input, index) => {
                    if (input === 'separator') {
                        return <Separator key={`separator-${index}`} />;
                    }
                    if (isLabelWithKeyType(input)) {
                        return <SectionTitle key={input.key} title={input.label} />;
                    }

                    return (
                        <Row key={(input as FormInputType<ContractEditFormValues>).name}>
                            <InputField
                                key={(input as FormInputType<ContractEditFormValues>).name}
                                input={input as FormInputType<ContractEditFormValues>}
                                control={control}
                                mode="edit"
                            />
                        </Row>
                    );
                })}
            </form>
        </>
    );
};
