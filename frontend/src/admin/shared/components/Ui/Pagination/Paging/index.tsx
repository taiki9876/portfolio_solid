import { range } from '@admin/shared/util/arrayUtil';
import styles from '../Pagination.module.css';

type Props = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};
export const Paging = ({ currentPage, totalPages, onPageChange }: Props) => {
    return (
        <div className={`${styles.paging}`}>
            {makePageItems(currentPage, totalPages).map((item, index) => {
                if (item === '...') {
                    return <div key={`currentPage-${item}-${index}`}>{item}</div>;
                }

                return (
                    <div
                        key={`currentPage-${item}-${index}`}
                        data-testid={`page-${item}`}
                        className={`${styles.pagingItem} ${isCurrentPage(item, currentPage) && styles.pageActive}`}
                        onClick={() => !isCurrentPage(item, currentPage) && onPageChange(item)}
                    >
                        {item}
                    </div>
                );
            })}
        </div>
    );
};

const VALIANT_LINE = 5; //このページ数以下の場合は簡易ページネーション[数値のみ]を表示する
//[1] [...] [24] [25] [26] [...] [50]のようなページネーションアイテムの配列を作成する関数
const makePageItems = (currentPage: number, totalPage: number): (number | '...')[] => {
    if (totalPage <= VALIANT_LINE) {
        return Array.from({ length: totalPage }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
        return [...range(1, currentPage + 2), '...', totalPage];
    }

    if (currentPage + 3 >= totalPage) {
        return [1, '...', ...range(currentPage - 2, totalPage)];
    }

    const prefix: (number | '...')[] = currentPage - 2 <= 2 ? [1] : [1, '...'];
    return [...prefix, ...range(currentPage - 2, currentPage + 2), '...', totalPage];
};

const isCurrentPage = (target: number, currentPageNumber: number) => {
    return target === currentPageNumber;
};
