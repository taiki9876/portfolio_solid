import styles from './DateLine.module.css';

type Props = {
    str: string;
};
export const DateLine = ({ str }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.separatorLine} />
            <div className={styles.dateStr}>{str}</div>
        </div>
    );
};
