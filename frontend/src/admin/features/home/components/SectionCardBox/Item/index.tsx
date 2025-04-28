import { addThousandSeparators, formatSignedNumber } from '@admin/shared/util/numberUtil';
import { JustifyCenter } from '@admin/shared/components/Layout/FlexBox/JustifyCenter';
import { UpImage } from './UpImage';
import styles from './Item.module.css';

type Props = {
    label: string;
    value: number | string;
    dif?: number;
    color?: string;
};
export const Item = ({ label, value, dif, color }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.label}>{label}</div>
            <div className={styles.separator} />
            <div className={styles.value} style={{ color: color }}>
                {typeof value === 'number' ? (
                    addThousandSeparators(value)
                ) : (
                    <>
                        {value}
                        <span className={styles.miniText}>件</span>
                    </>
                )}
            </div>
            {dif !== undefined && (
                <JustifyCenter className={styles.description}>
                    昨日から<span>{formatSignedNumber(dif)}</span> <UpImage />
                </JustifyCenter>
            )}
        </div>
    );
};
