import {
    TableCell,
    TableCellPlaceholder,
    TableCellType,
} from '@admin/shared/components/Ui/Table/TableRow/TableCell';
import styles from './TableRow.module.css';

export type RowType = {
    id: string | number;
    values: TableCellType[];
};
type Props = {
    row: RowType;
    onRowClick?: (row: RowType) => void;
    displayIndexes: number[];
};
export const TableRow = ({ row, onRowClick, displayIndexes }: Props) => {
    return (
        <tr
            className={styles.row}
            onClick={onRowClick !== undefined ? () => onRowClick(row) : undefined}
        >
            {row.values.map((value, index) => {
                if (!displayIndexes.includes(index)) {
                    return null;
                }

                return <TableCell text={value} key={index} />;
            })}
        </tr>
    );
};

type PlaceholderProps = {
    colSpan: number;
};
export const TableRowPlaceholder = ({ colSpan }: PlaceholderProps) => {
    return (
        <>
            {Array.from({ length: 12 }).map((_, index) => (
                <tr
                    key={index}
                    className={styles.row}
                    style={{ pointerEvents: 'none' }}
                    data-testid={`${'tableRow-placeholder'}-${index}`}
                >
                    <TableCellPlaceholder colSpan={colSpan} />
                </tr>
            ))}
        </>
    );
};
