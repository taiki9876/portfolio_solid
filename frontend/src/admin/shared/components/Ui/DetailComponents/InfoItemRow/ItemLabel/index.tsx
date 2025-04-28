import styles from '../InfoItemRow.module.css';

type Props = {
    label: string;
    labelWidth?: number;
};
export const ItemLabel = ({ label, labelWidth = 70 }: Props) => {
    return (
        <div className={styles.label} style={{ width: `${labelWidth}px` }}>
            {label}
        </div>
    );
};
