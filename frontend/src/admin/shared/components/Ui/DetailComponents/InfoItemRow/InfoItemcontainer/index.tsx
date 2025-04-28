import { ReactNode } from 'react';
import styles from '../InfoItemRow.module.css';

type Props = {
    isFull?: boolean;
    isWrap?: boolean;
    children: ReactNode;
};
export const InfoItemContainer = ({ isFull = true, isWrap = false, children }: Props) => {
    return (
        <div className={`${styles.item} ${isFull ? styles.full : ''} ${isWrap ? styles.wrap : ''}`}>
            {children}
        </div>
    );
};
