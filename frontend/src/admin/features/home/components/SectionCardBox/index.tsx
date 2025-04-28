import { ReactNode } from 'react';
import styles from './SectionCardBox.module.css';

type Props = {
    shouldPadding?: boolean;
    children: ReactNode;
};
export const SectionCardBox = ({ shouldPadding = true, children }: Props) => {
    return (
        <div className={`${styles.container} ${shouldPadding && styles.padding}`}>{children}</div>
    );
};
