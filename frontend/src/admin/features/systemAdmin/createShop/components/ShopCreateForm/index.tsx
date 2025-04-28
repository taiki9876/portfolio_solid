import { ErrorBox } from '@admin/shared/components/Ui/Form/ErrorBox';
import styles from '@admin/features/systemAdmin/createContract/components/ContractCreateForm/ContractCreateForm.module.css';
import { Separator } from '@admin/shared/components/Ui/Separator';
import { TextButton } from '@admin/shared/components/Ui/Button/TextButton';
import {
    inputOfShopForApp,
    inputOfShopForAppImage,
    inputOfShopInfo,
} from '@admin/domain/shop/form/formFieldDefinition';
import { InputField } from '@admin/shared/lib/reactHookForm/components/InputField';
import { FlexStart } from '@admin/shared/components/Layout/FlexBox/FlexStart';
import { usePreventEnterSubmit } from '@src/shared/hooks/usePreventEnterSubmit';
import { usePostShop } from './hooks/usePostShop';

const formId = 'createShopForm';
export const ShopCreateForm = () => {
    const { apexMarker, hasError, submitHandler, control, resetInput } = usePostShop();
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
                <h2>店舗名</h2>
                {inputOfShopInfo.map((input) => (
                    <InputField key={input.name} input={input} control={control} />
                ))}

                <Separator isBorder={false} marginLevel="verySmall" />

                <h2>
                    アプリ関連の設定
                    <br />
                    <span className={styles.description}>
                        <ul>
                            <li>※主にアプリに表示される情報を登録します。</li>
                        </ul>
                    </span>
                </h2>

                {inputOfShopForApp.map((input) => {
                    if (input.name === 'images[0]') {
                        return (
                            <FlexStart key="imageList">
                                {inputOfShopForAppImage.map((imageInput) => (
                                    <InputField
                                        key={imageInput.name}
                                        input={imageInput}
                                        control={control}
                                    />
                                ))}
                            </FlexStart>
                        );
                    }
                    return <InputField key={input.name} input={input} control={control} />;
                })}

                <div className={styles.buttonContainer}>
                    <TextButton label="リセット" variant="plain" onClick={resetInput} />
                    <TextButton label="店舗を追加" variant="primary" formId={formId} />
                </div>
            </form>
        </>
    );
};
