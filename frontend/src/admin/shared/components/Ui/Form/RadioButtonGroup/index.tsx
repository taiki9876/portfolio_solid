import { RadioButton } from '@admin/shared/components/Ui/Button/RadioButton';
import { FormLabel } from '@admin/shared/components/Ui/Form/FormLabel';
import styles from './RadioButtonGroup.module.css';
import formStyles from '../Form.module.css';

export type ButtonOptionType = {
    label: string;
    value: string;
};

type Props = {
    label?: string;
    groupName: string;
    value: string;
    options: ButtonOptionType[];
    changeValue: (value: string) => void;
    error?: {
        message?: string;
    };
    required?: boolean;
    flexDirection?: 'column' | 'row';
};
export const RadioButtonGroup = ({
    label,
    groupName,
    value,
    options,
    changeValue,
    error,
    required = false,
    flexDirection = 'row',
}: Props) => {
    return (
        <div className={formStyles.container}>
            <FormLabel label={label} required={required} />
            <div className={styles.row} style={{ flexDirection: flexDirection }}>
                {options.map((option, index) => (
                    <RadioButton
                        key={`${groupName}-${index}`}
                        label={option.label}
                        value={option.value}
                        checked={value === option.value}
                        onChange={changeValue}
                        name={groupName}
                    />
                ))}
            </div>
            {error !== undefined && <p className={formStyles.errorMessage}>{error?.message}</p>}
        </div>
    );
};
