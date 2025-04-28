import React from 'react';
import { FormLabel } from '@admin/shared/components/Ui/Form/FormLabel';
import { ArrowDownIcon } from '@admin/shared/components/Ui/Icon/ArrowDownIcon';
import { Colors } from '@admin/assets/styles/colors';
import styles from './Dropdown.module.css';

export type DropDownOption = {
    label: string;
    value: string;
};

type Props = {
    options: DropDownOption[];
    selectedValue?: string;
    onChange: (value: string) => void; // 値が変更された時のコールバック
    label?: string;
    required?: boolean;
    placeholder?: string;
    disabled?: boolean;
    isDisplayIcon?: boolean;
    alignCenter?: boolean;
};

export const Dropdown: React.FC<Props> = ({
    options,
    selectedValue = '',
    onChange,
    label,
    required,
    placeholder = '選択してください',
    disabled = false,
    isDisplayIcon = false,
    alignCenter = false,
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value); // 選択された値を親コンポーネントに通知
    };

    return (
        <div className={styles.dropdownContainer}>
            <FormLabel label={label} required={required} />
            <select
                value={selectedValue}
                onChange={handleChange}
                className={`${styles.select} ${disabled ? styles.disabled : ''}`}
                disabled={disabled}
                style={{ textAlignLast: alignCenter ? 'center' : 'start' }}
            >
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {isDisplayIcon && (
                <div className={styles.arrowIcon}>
                    <ArrowDownIcon color={Colors.gray400} />
                </div>
            )}
        </div>
    );
};
