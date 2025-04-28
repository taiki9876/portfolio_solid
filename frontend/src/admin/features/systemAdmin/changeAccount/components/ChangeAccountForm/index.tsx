import { TextInput } from '@admin/shared/components/Ui/Form';
import { TextButton } from '@admin/shared/components/Ui/Button/TextButton';
import { useChangeSupportAccount } from '@admin/features/systemAdmin/shared/hooks/useChangeSupportAccount';
import styles from './ChangeAccountForm.module.css';

export const ChangeAccountForm = () => {
    const { key, setKey, handleChangeAccount } = useChangeSupportAccount();

    return (
        <div className={styles.changeAccountFormContainer}>
            <div className={styles.description}>契約アカウントのキーを入力してください。</div>

            <TextInput
                value={key}
                onChange={setKey}
                label="キーは契約一覧から確認できます。"
                placeholder="アカウントキーを入力"
            />

            <TextButton label="アカウント切り替え" onClick={handleChangeAccount} />
        </div>
    );
};
