import { LabelWithKeyType } from '@src/shared/type';
import styles from './Header.module.css';
import { HeaderItem } from './HeaderItem';

export type HeaderType = LabelWithKeyType; // ex: { label: '会員コード', key: 'customerCode' }
type Props = {
    headers: HeaderType[];
    displayColumns: string[];
};

export const TableHeader = ({ headers, displayColumns }: Props) => {
    return (
        <thead className={styles.header}>
            <tr>
                {headers.map((header) => {
                    if (!displayColumns.includes(header.key)) {
                        return null;
                    }
                    return <HeaderItem key={header.key} text={header.label} />;
                })}
            </tr>
        </thead>
    );
};
