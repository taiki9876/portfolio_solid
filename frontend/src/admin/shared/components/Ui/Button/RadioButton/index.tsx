import React, { useId } from 'react';
import styles from './RadioButton.module.css';

type Props = {
    label?: string;
    value: string;
    name: string;
    checked?: boolean;
    onChange?: (value: string) => void;
    disabled?: boolean;
};
export const RadioButton = ({
    label,
    value,
    name,
    checked = false,
    onChange,
    disabled = false,
}: Props) => {
    const id = useId();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange !== undefined) {
            onChange(event.target.value);
        }
    };

    return (
        <div className={styles.radioContainer}>
            <input
                type="radio"
                id={id}
                className={styles.radio}
                value={value}
                name={name}
                checked={checked}
                onChange={handleChange}
                disabled={disabled}
            />
            <label
                htmlFor={id}
                className={`${styles.customRadio} ${disabled ? styles.disabled : ''}`}
            >
                <span className={styles.circle} />
            </label>
            {label !== undefined && (
                <label
                    htmlFor={id}
                    className={`${styles.label} ${disabled ? styles.disabledLabel : ''}`}
                >
                    {label}
                </label>
            )}
        </div>
    );
};
