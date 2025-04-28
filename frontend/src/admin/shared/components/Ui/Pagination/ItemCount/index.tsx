import styles from '../Pagination.module.css';

type Props = {
    totalItemCount: number;
    perPage: number;
    currentPage: number;
};
export const ItemCount = ({ totalItemCount, perPage, currentPage }: Props) => {
    const renderItemCount = () => {
        const start = Math.min(perPage * currentPage - perPage + 1, totalItemCount);
        const end = Math.min(start + perPage - 1, totalItemCount);

        return `${start}-${end}`;
    };

    return (
        <div className={`${styles.countResult} ${styles.box}`}>
            {totalItemCount}件中 <span>{renderItemCount()}</span>
            件を表示
        </div>
    );
};
