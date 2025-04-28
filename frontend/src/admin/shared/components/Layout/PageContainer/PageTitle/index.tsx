import { ReactNode } from 'react';
import styles from './PageTitle.module.css';

export type PageTitleType = string | { label: ReactNode; onClick: () => void };
type Props = {
    title: PageTitleType;
};
export const PageTitle = ({ title }: Props) => {
    if (isStringTitle(title)) {
        return <div className={styles.title}>{title}</div>;
    }

    return (
        <div className={`${styles.title} ${styles.componentTitle}`} onClick={title.onClick}>
            {title.label}
        </div>
    );
};

const isStringTitle = (title: PageTitleType): title is string => {
    return typeof title === 'string';
};
