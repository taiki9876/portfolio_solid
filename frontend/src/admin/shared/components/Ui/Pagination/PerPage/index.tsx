import { useRef } from 'react';
import { ArrowDownIcon } from '@admin/shared/components/Ui/Icon/ArrowDownIcon';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import styles from '../Pagination.module.css';

type Props = {
    value: number;
    onPerPageChange: (perPage: number) => void;
};
export const PerPage = ({ value, onPerPageChange }: Props) => {
    const selectBox = useRef<HTMLSelectElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onPerPageChange(Number(e.target.value));
    };

    return (
        <div className={`${styles.perPage} ${styles.box}`}>
            <div className={styles.perPageSelectBox}>
                <select
                    className={styles.perPageNum}
                    value={value}
                    onChange={handleChange}
                    ref={selectBox}
                    data-testid="per-page-select"
                >
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <div className={styles.perPageIcon}>
                    <ArrowDownIcon size={IconSize.xs} />
                </div>
            </div>
            <div>件表示</div>
        </div>
    );
};
