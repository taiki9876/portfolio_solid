import React, { useId } from 'react';
import styles from './Checkbox.module.css';

type Props = {
    label?: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    size?: 'mini' | 'small' | 'medium';
};

export const Checkbox = ({
    label,
    checked = false,
    onChange,
    disabled = false,
    size = 'medium',
}: Props) => {
    const id = useId();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(event.target.checked);
    };

    return (
        <div className={styles.checkboxContainer}>
            <input
                type="checkbox"
                id={id}
                className={styles.checkbox}
                checked={checked}
                onChange={handleChange}
                disabled={disabled}
            />
            <label
                htmlFor={id}
                className={styles.customCheckbox}
                style={{ width: sizeToPixel[size].outline, height: sizeToPixel[size].outline }}
            >
                <span
                    className={styles.checkmark}
                    style={{ width: sizeToPixel[size].check, height: sizeToPixel[size].check }}
                />
            </label>
            {label !== undefined && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}
        </div>
    );
};

const sizeToPixel = {
    mini: { outline: '16px', check: '8px' },
    small: { outline: '20px', check: '10px' },
    medium: { outline: '24px', check: '14px' },
};
