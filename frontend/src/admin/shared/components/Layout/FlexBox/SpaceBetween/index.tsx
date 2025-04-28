import { ReactNode } from 'react';
import styles from './SpaceBetween.module.css';

type Props = {
    className?: string;
    children: ReactNode;
};
export const SpaceBetween = ({ className, children }: Props) => {
    return <div className={`${styles.betweenContainer} ${className}`}>{children}</div>;
};
