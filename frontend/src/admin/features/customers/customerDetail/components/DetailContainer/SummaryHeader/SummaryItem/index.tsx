import styles from './SummaryHeaderItem.module.css';

type Props = {
    name: string;
    value: string;
};
export const SummaryItem = ({ name, value }: Props) => {
    return (
        <div className={styles.headerItemBox}>
            <div className={styles.summaryHeaderName}>{name}</div>
            <div className={styles.summaryHeaderValue}>{value}</div>
        </div>
    );
};
