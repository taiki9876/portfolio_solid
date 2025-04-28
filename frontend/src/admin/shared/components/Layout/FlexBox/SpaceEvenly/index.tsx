import { ReactNode } from 'react';
import styles from './SpaceEvenly.module.css';

type Props = {
    className?: string;
    children: ReactNode;
};
export const SpaceEvenly = ({ className, children }: Props) => {
    return <div className={`${styles.evenContainer} ${className}`}>{children}</div>;
};
