import { Separator } from '@admin/shared/components/Ui/Separator';
import { TextButton } from '@admin/shared/components/Ui/Button/TextButton';
import {
    inputOfAdditional,
    inputOfAdmin,
    inputOfContract,
    inputOfInCharge,
} from '@admin/domain/contract/form/formFieldDefinition';
import { ErrorBox } from '@admin/shared/components/Ui/Form/ErrorBox';
import { FormInputType, InputField } from '@admin/shared/lib/reactHookForm/components/InputField';
import { ContractCreateFormValues } from '@admin/domain/contract/form/formValue';
import { usePreventEnterSubmit } from '@src/shared/hooks/usePreventEnterSubmit';
import styles from './ContractCreateForm.module.css';
import { usePostContract } from './hooks/usePostContract';

const formId = 'createContractForm';
export const ContractCreateForm = () => {
    const { submitHandler, control, hasError, resetInput, apexMarker } = usePostContract();
    const onKeyDown = usePreventEnterSubmit();

    return (
        <>
            <div ref={apexMarker} />
            {hasError && <ErrorBox messages={['入力内容を再度ご確認ください。']} />}
            <form
                id={formId}
                className={styles.formContainer}
                onSubmit={submitHandler}
                onKeyDown={onKeyDown}
            >
                <h2>契約情報</h2>
                {inputOfContract.map((input) => (
                    <InputField
                        key={input.name}
                        input={input as FormInputType<ContractCreateFormValues>}
                        control={control}
                    />
                ))}

                <Separator isBorder={false} marginLevel="verySmall" />

                <h2>担当者様 情報</h2>
                {inputOfInCharge.map((input) => (
                    <InputField
                        key={input.name}
                        input={input as FormInputType<ContractCreateFormValues>}
                        control={control}
                    />
                ))}

                <Separator isBorder={false} marginLevel="verySmall" />

                <h2>その他メモ・備考</h2>
                {inputOfAdditional.map((input) => (
                    <InputField
                        key={input.name}
                        input={input as FormInputType<ContractCreateFormValues>}
                        control={control}
                    />
                ))}

                <Separator />
                <h2>
                    管理者アカウント (店舗オーナーアカウント)
                    <br />
                    <span className={styles.description}>
                        <ul>
                            <li>※支店管理者アカウントは別途、支店作成時に作成できます。</li>
                            <li>※ログインID、初期パスワードは担当者様へ通知してください。</li>
                        </ul>
                    </span>
                </h2>

                {inputOfAdmin.map((input) => (
                    <InputField
                        key={input.name}
                        input={input as FormInputType<ContractCreateFormValues>}
                        control={control}
                    />
                ))}

                <div className={styles.buttonContainer}>
                    <TextButton label="リセット" variant="plain" onClick={resetInput} />
                    <TextButton label="アカウントを追加" variant="primary" formId={formId} />
                </div>
            </form>
        </>
    );
};
