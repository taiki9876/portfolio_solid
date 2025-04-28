import { ReactNode } from 'react';
import styles from './FlexStart.module.css';
import commonStyles from '../FlexBox.module.css';

type GapSize = 'mini' | 'small' | 'medium' | 'large';
type Props = {
    gap?: GapSize;
    className?: string;
    direction?: 'row' | 'column';
    children: ReactNode;
};
export const FlexStart = ({ gap = 'medium', className, direction = 'row', children }: Props) => {
    return (
        <div
            className={`${styles.listContainer} ${styles[gap]} ${direction === 'row' ? commonStyles.directionRow : commonStyles.directionColumn} ${className}`}
            style={{ gap }}
        >
            {children}
        </div>
    );
};
