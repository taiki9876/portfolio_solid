import { ItemCount } from './ItemCount';
import { PerPage } from './PerPage';
import { Paging } from './Paging';
import styles from './Pagination.module.css';

type PerPage = {
    value: number;
    onPerPageChange: (perPage: number) => void;
};
type Paging = {
    currentPage: number;
    onPageChange: (page: number) => void;
};
type Props = {
    totalItemCount: number;
    perPage: PerPage;
    paging: Paging;
    separator?: boolean;
};
export const Pagination = ({ totalItemCount, perPage, paging, separator = true }: Props) => {
    return (
        <div className={`${styles.container} ${separator && styles.separator}`}>
            <ItemCount
                totalItemCount={totalItemCount}
                perPage={perPage.value}
                currentPage={paging.currentPage}
            />

            <div className={styles.columnRight}>
                <PerPage {...perPage} />
                <Paging
                    currentPage={paging.currentPage}
                    totalPages={Math.ceil(totalItemCount / perPage.value)}
                    onPageChange={paging.onPageChange}
                />
            </div>
        </div>
    );
};
