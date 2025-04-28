import { FormEventHandler } from 'react';
import {
    DatePicker,
    RadioButtonGroup,
    TextArea,
    TextInput,
} from '@admin/shared/components/Ui/Form';
import { CheckboxGroup } from '@admin/shared/components/Ui/Form/CheckboxGroup';
import { Control, Controller, SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { updateDate } from '@admin/shared/util/dateUtil';
import { TextButton } from '@admin/shared/components/Ui/Button/TextButton';
import { ErrorBox } from '@admin/shared/components/Ui/Form/ErrorBox';
import { useErrorHandler } from '@admin/shared/lib/reactHookForm/useErrorHandler';
import { Row } from '@admin/shared/components/Ui/Form/ModalForm/Row';
import { useCreateCustomer } from './hooks/useCreateCustomer';
import styles from './CustomerCreateForm.module.css';
import {
    FormValues,
    addressRule,
    birthDateRule,
    emailRule,
    genderRule,
    memberNumberRule,
    nameRule,
    phoneNumberRule,
    postalCodeRule,
} from './formValue';

/**
 * 顧客情報登録フォーム
 */
type Props = {
    formId: string;
    handleSubmit: (
        onValid: SubmitHandler<FormValues>,
        onInvalid?: SubmitErrorHandler<FormValues>
    ) => FormEventHandler<HTMLFormElement>;
    control: Control<FormValues>;
    resetInput: () => void;
};
export const CustomerCreateForm = ({ formId, handleSubmit, control, resetInput }: Props) => {
    const { apexMarker, hasError, resetError, onInputError } = useErrorHandler();
    const { handleCreateCustomer } = useCreateCustomer();

    const allClear = () => {
        resetInput();
        resetError();
    };

    const onSubmit = (data: FormValues) => {
        void handleCreateCustomer(data, allClear);
    };

    return (
        <>
            <div ref={apexMarker} />
            {hasError && <ErrorBox messages={['入力内容を再度ご確認ください。']} />}
            <form id={formId} onSubmit={handleSubmit(onSubmit, onInputError)}>
                <Row>
                    <Controller
                        name="lastName"
                        control={control}
                        rules={nameRule()}
                        render={({ field, fieldState }) => (
                            <TextInput
                                label="苗字"
                                required={true}
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error}
                            />
                        )}
                    />

                    <Controller
                        name="firstName"
                        control={control}
                        rules={nameRule()}
                        render={({ field, fieldState }) => (
                            <TextInput
                                label="名前"
                                required={true}
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error}
                            />
                        )}
                    />
                </Row>

                <Row>
                    <Controller
                        name="lastNameKana"
                        control={control}
                        rules={nameRule(true)}
                        render={({ field, fieldState }) => (
                            <TextInput
                                label="苗字カナ"
                                required={true}
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error}
                            />
                        )}
                    />
                    <Controller
                        name="firstNameKana"
                        control={control}
                        rules={nameRule(true)}
                        render={({ field, fieldState }) => (
                            <TextInput
                                label="名前カナ"
                                required={true}
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error}
                            />
                        )}
                    />
                </Row>

                <Row>
                    <Controller
                        name="memberNumber"
                        control={control}
                        rules={memberNumberRule()}
                        render={({ field, fieldState }) => (
                            <TextInput
                                label="会員番号"
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error}
                            />
                        )}
                    />
                </Row>

                <Row>
                    <Controller
                        name="parentMemberNumber"
                        control={control}
                        rules={memberNumberRule()}
                        render={({ field, fieldState }) => (
                            <TextInput
                                label="親会員番号"
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error}
                            />
                        )}
                    />
                </Row>

                <Row>
                    <Controller
                        name="birthDate"
                        control={control}
                        rules={birthDateRule()}
                        render={({ field, fieldState }) => (
                            <DatePicker
                                label="生年月日"
                                onReset={() => field.onChange(undefined)}
                                value={field.value}
                                onDateChange={(date) => {
                                    field.onChange(updateDate(field.value, date));
                                }}
                                error={fieldState.error}
                            />
                        )}
                    />
                </Row>

                <Row>
                    <Controller
                        name="gender"
                        control={control}
                        rules={genderRule()}
                        render={({ field, fieldState }) => (
                            <RadioButtonGroup
                                groupName="gender"
                                label="性別"
                                value={field.value}
                                options={[
                                    { label: '男性', value: 'male' },
                                    { label: '女性', value: 'female' },
                                    { label: '不明', value: 'unknown' },
                                ]}
                                changeValue={field.onChange}
                                error={fieldState.error}
                            />
                        )}
                    />
                </Row>

                <Row>
                    <Controller
                        name="email"
                        control={control}
                        rules={emailRule()}
                        render={({ field, fieldState }) => (
                            <TextInput
                                label="メール"
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error}
                            />
                        )}
                    />

                    <Controller
                        name="isEmailGuidance"
                        control={control}
                        rules={emailRule()}
                        render={({ field, fieldState }) => (
                            <div className={styles.textWithCheckbox}>
                                <CheckboxGroup
                                    label=""
                                    groupName="mail"
                                    options={[{ label: '案内メール', value: 'receive' }]}
                                    selectedValues={field.value === true ? ['receive'] : []}
                                    onChange={(selectedValues) =>
                                        field.onChange(selectedValues.length > 0)
                                    }
                                    error={fieldState.error}
                                />
                            </div>
                        )}
                    />
                </Row>

                <Row>
                    <Controller
                        name="phoneNumber"
                        control={control}
                        rules={phoneNumberRule()}
                        render={({ field, fieldState }) => (
                            <TextInput
                                label="電話番号"
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error}
                            />
                        )}
                    />
                </Row>

                <Row>
                    <Controller
                        name="customerCode"
                        control={control}
                        rules={memberNumberRule()}
                        render={({ field, fieldState }) => (
                            <TextInput
                                label="会員コード"
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error}
                            />
                        )}
                    />
                </Row>

                <Row>
                    <Controller
                        name="postalCode"
                        control={control}
                        rules={postalCodeRule()}
                        render={({ field, fieldState }) => (
                            <TextInput
                                label="郵便番号"
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error}
                            />
                        )}
                    />
                </Row>

                <Row>
                    <Controller
                        name="address"
                        control={control}
                        rules={addressRule()}
                        render={({ field, fieldState }) => (
                            <TextArea
                                label="住所"
                                value={field.value}
                                onChange={field.onChange}
                                error={fieldState.error}
                                rows={3}
                            />
                        )}
                    />
                </Row>
                <div className={styles.resetButton}>
                    <TextButton label="リセット" onClick={allClear} variant="secondary" />
                </div>
            </form>
        </>
    );
};
