import { MediaInput } from './MediaInput';
import { TextForm } from './TextForm';
import styles from './MessageForm.module.css';

export const MessageForm = () => {
    return (
        <div className={styles.formContainer}>
            <MediaInput />
            <TextForm />
        </div>
    );
};
