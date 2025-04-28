import { ReactNode } from 'react';
import styles from './JustifyCenter.module.css';

type Props = {
    className?: string;
    children: ReactNode;
};
export const JustifyCenter = ({ className, children }: Props) => {
    return <div className={`${styles.justifyCenter} ${className}`}>{children}</div>;
};
