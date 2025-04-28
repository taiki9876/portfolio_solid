import { ComponentType } from 'react';
import { Colors } from '@admin/assets/styles/colors';
import styles from './ActionButton.module.css';

type Props = {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    icon?: ComponentType<{ color: string }>;
    variant?: 'primary' | 'danger' | 'normal';
};
export const ActionButton = ({
    label,
    onClick,
    disabled,
    icon: Icon,
    variant = 'primary',
}: Props) => {
    return (
        <button
            className={`${styles.button} ${styles[variant]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {Icon !== undefined && <Icon color={Colors.primary} />}
            {label}
        </button>
    );
};
