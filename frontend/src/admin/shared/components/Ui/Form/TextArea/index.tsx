import { FormLabel } from '@admin/shared/components/Ui/Form/FormLabel';
import styles from './TextArea.module.css';
import formStyles from '../Form.module.css';

type Props = {
    label?: string;
    value: string;
    placeholder?: string;
    onChange: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
    error?: {
        message?: string;
    };
    rows?: number;
};
export const TextArea: React.FC<Props> = ({
    label,
    value,
    placeholder,
    onChange,
    required = false,
    disabled = false,
    error,
    rows = 5,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className={styles.container}>
            <FormLabel label={label} required={required} />
            <textarea
                className={`${styles.textarea} ${error !== undefined ? formStyles.error : ''}`}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                disabled={disabled}
                rows={rows}
            />
            {error !== undefined && <p className={formStyles.errorMessage}>{error?.message}</p>}
        </div>
    );
};
