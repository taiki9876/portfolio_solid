import { ReactNode } from 'react';
import styles from './SectionContainer.module.css';

type Props = {
    shouldPadding?: boolean;
    shouldMargin?: boolean;
    isHeightFit?: boolean;
    children: ReactNode;
};
export const SectionContainer = ({
    shouldPadding = true,
    shouldMargin = false,
    isHeightFit = false,
    children,
}: Props) => {
    return (
        <div
            className={`
                ${styles.container}
                ${shouldPadding ? '' : styles.noPadding}
                ${shouldMargin ? '' : styles.marginBottom}
                ${isHeightFit ? styles.heightFit : ''}`}
        >
            {children}
        </div>
    );
};
