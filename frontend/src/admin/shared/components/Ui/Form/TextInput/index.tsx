import { InputHTMLAttributes } from 'react';
import { FormLabel } from '@admin/shared/components/Ui/Form/FormLabel';
import styles from './TextInput.module.css';
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
    containerClassName?: string;
    inputClassName?: string;
    attributes?: InputHTMLAttributes<HTMLInputElement>;
};
export const TextInput = ({
    label,
    value,
    placeholder,
    onChange,
    required = false,
    disabled = false,
    error,
    containerClassName,
    inputClassName,
    attributes,
}: Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value); // 入力値を親コンポーネントに渡す
    };

    return (
        <div className={`${formStyles.container} ${containerClassName}`}>
            <FormLabel label={label} required={required} />
            <input
                {...attributes}
                className={`${styles.input} ${inputClassName} ${disabled === true ? formStyles.disabled : ''} ${error !== undefined ? formStyles.error : ''}`}
                type="text"
                value={value}
                onChange={handleChange}
                disabled={disabled}
                placeholder={placeholder}
            />
            {error !== undefined && <p className={formStyles.errorMessage}>{error?.message}</p>}
        </div>
    );
};
