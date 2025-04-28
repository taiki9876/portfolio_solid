import { ReactNode, isValidElement, ButtonHTMLAttributes } from 'react';
import styles from './TextButton.module.css';

type Props = {
    label: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'plain' | 'outline' | 'text';
    onClick?: () => void;
    size?: 'full' | 'auto';
    roundType?: 'rounded' | 'normal';
    disabled?: boolean;
    icon?: string | ReactNode;
    className?: string;
    formId?: string;
};
export const TextButton = ({
    label,
    variant = 'primary',
    onClick = () => {},
    size = 'auto',
    roundType = 'normal',
    disabled = false,
    icon = undefined,
    className = '',
    formId,
}: Props) => {
    const buttonClassName = `
        ${styles.button} 
        ${styles[`button--${variant}`]} 
        ${styles[`button--${size}`]} 
        ${styles[`button--${roundType}`]} 
        ${disabled ? styles['button--disabled'] : ''} 
        ${className}
  `.trim();

    const renderIcon = () => {
        if (typeof icon === 'undefined') {
            return null;
        }

        if (typeof icon === 'string') {
            return <img src={icon} />;
        }

        if (isValidElement(icon)) {
            return icon; // iconがReactNodeの場合そのままレンダリング
        }

        return null;
    };
    const hasIcon = icon !== undefined;

    const formProps: ButtonHTMLAttributes<HTMLButtonElement> =
        formId !== undefined ? { form: formId, type: 'submit' } : { type: 'button' };
    return (
        <button
            {...formProps}
            className={buttonClassName}
            onClick={onClick}
            disabled={disabled}
            style={{ paddingLeft: hasIcon ? '6px' : '1rem' }}
        >
            {renderIcon()}
            {label}
        </button>
    );
};
