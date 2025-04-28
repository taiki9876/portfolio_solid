import { Checkbox } from '@admin/shared/components/Ui/Button/Checkbox';
import { FormLabel } from '@admin/shared/components/Ui/Form/FormLabel';
import styles from './CheckboxGroup.module.css';
import formStyles from '../Form.module.css';

export type CheckboxOptionType = {
    label: string;
    value: string;
};

type Props = {
    label?: string;
    groupName: string;
    selectedValues?: string[];
    options: CheckboxOptionType[];
    onChange: (selectedValues: string[]) => void;
    required?: boolean;
    error?: {
        message?: string;
    };
    flexDirection?: 'column' | 'row';
};
export const CheckboxGroup = ({
    label,
    groupName,
    selectedValues = [],
    options,
    onChange,
    required = false,
    error,
    flexDirection = 'row',
}: Props) => {
    const handleChange = (value: string, checked: boolean) => {
        if (onChange === undefined) {
            return;
        }

        const newSelectedValues = checked
            ? [...selectedValues, value]
            : selectedValues.filter((item) => item !== value);
        onChange(newSelectedValues);
    };

    return (
        <div className={styles.container}>
            <FormLabel label={label} required={required} />
            <div className={styles.row} style={{ flexDirection: flexDirection }}>
                {options.map((option, index) => (
                    <Checkbox
                        key={`checkbox-${groupName}-${index}`}
                        label={option.label}
                        checked={selectedValues.includes(option.value)}
                        onChange={(checked) => {
                            handleChange(option.value, checked);
                        }}
                    />
                ))}
            </div>
            {error !== undefined && <p className={formStyles.errorMessage}>{error?.message}</p>}
        </div>
    );
};
