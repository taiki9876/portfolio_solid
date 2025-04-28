import { ColumnSelector } from '@admin/shared/components/Ui/Table/ColumnSelector';
import { useColumnHandle } from '@admin/shared/components/Ui/Table/hooks/useColumnHandle';
import { TableBody } from '@admin/shared/components/Ui/Table/TableBody';
import { RowType } from '@admin/shared/components/Ui/Table/TableRow';
import styles from './Table.module.css';
import { HeaderType, TableHeader } from './TableHeader';

type Props = {
    tableKey: string;
    headers: HeaderType[];
    rows: RowType[];
    onRowClick?: (row: RowType) => void;
    isLoading?: boolean;
    needColumnSelector?: boolean;
    border?: boolean;
    height?: string;
};

export const Table = ({
    tableKey,
    headers,
    rows,
    onRowClick,
    isLoading,
    needColumnSelector = false,
    border = false,
    height,
}: Props) => {
    const { displayColumns, displayIndexes, handleDisplayColumnsChange } = useColumnHandle(headers);
    return (
        <div
            className={`${styles.tableContainer} ${border && styles.outline}`}
            style={{ height: height }}
        >
            <div className={styles.tableViewBox}>
                <table className={styles.table}>
                    <TableHeader headers={headers} displayColumns={displayColumns} />
                    <TableBody
                        tableKey={tableKey}
                        headers={headers}
                        displayIndexes={displayIndexes}
                        isLoading={isLoading === undefined ? false : isLoading}
                        rows={rows}
                        onRowClick={onRowClick}
                    />
                </table>
            </div>
            {needColumnSelector && (
                <ColumnSelector
                    groupName={tableKey}
                    headers={headers}
                    displayColumns={displayColumns}
                    onDisplayColumnsChange={handleDisplayColumnsChange}
                />
            )}
        </div>
    );
};
