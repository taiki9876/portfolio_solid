import { ReactNode } from 'react';
import styles from './FelxEnd.module.css';
import commonStyles from '../FlexBox.module.css';

type Props = {
    direction?: 'row' | 'column';
    children: ReactNode;
};
export const FlexEnd = ({ direction = 'row', children }: Props) => {
    return (
        <div
            className={`${styles.container} ${direction === 'row' ? commonStyles.directionRow : commonStyles.directionColumn}`}
        >
            {children}
        </div>
    );
};
