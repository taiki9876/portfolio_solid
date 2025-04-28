import { RowType, TableRow, TableRowPlaceholder } from '@admin/shared/components/Ui/Table/TableRow';
import { HeaderType } from '@admin/shared/components/Ui/Table/TableHeader';

type Props = {
    tableKey: string;
    headers: HeaderType[];
    displayIndexes: number[];
    isLoading: boolean;
    rows: RowType[];
    onRowClick?: (row: RowType) => void;
};
export const TableBody = ({
    tableKey,
    headers,
    displayIndexes,
    isLoading,
    rows,
    onRowClick,
}: Props) => {
    const renderBody = () => {
        if (displayIndexes.length === 0) {
            return null;
        }

        if (isLoading) {
            return <TableRowPlaceholder colSpan={headers.length} />;
        }

        if (rows.length === 0) {
            return (
                <TableRow
                    row={{ id: 'noData', values: ['登録情報はありません。'] }}
                    displayIndexes={displayIndexes}
                />
            );
        }

        return rows.map((row, index) => {
            return (
                <TableRow
                    key={`row-${tableKey}-${index}`}
                    row={row}
                    onRowClick={onRowClick}
                    displayIndexes={displayIndexes}
                />
            );
        });
    };

    return <tbody>{renderBody()}</tbody>;
};
