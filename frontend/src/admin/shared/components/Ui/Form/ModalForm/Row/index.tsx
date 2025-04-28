import { ReactNode } from 'react';
import styles from './Row.module.css';

export const Row = ({ children }: { children: ReactNode }) => {
    return <div className={styles.row}>{children}</div>;
};
