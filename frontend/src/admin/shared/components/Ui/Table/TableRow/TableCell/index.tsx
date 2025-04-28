import { CircleIcon } from '@admin/shared/components/Ui/Icon/CircleIcon';
import { CrossIcon } from '@admin/shared/components/Ui/Icon/CrossIcon';
import { Colors } from '@admin/assets/styles/colors';
import { TableRowPlaceholder } from '@admin/shared/components/Ui/Placeholder/TableRowPlaceholder';
import styles from './TableCell.module.css';

export type TableCellType = number | string | boolean | undefined | null;
type Props = {
    text: TableCellType;
    colSpan?: number;
};
export const TableCell = ({ text, colSpan = 1 }: Props) => {
    return (
        <td
            className={`${styles.td} ${isBoolValue(text) ? styles.cellCenter : ''}`}
            colSpan={colSpan}
        >
            {renderValue(text)}
        </td>
    );
};

type PlaceholderProps = {
    colSpan?: number;
};
export const TableCellPlaceholder = ({ colSpan = 1 }: PlaceholderProps) => {
    return (
        <td className={`${styles.td} `} colSpan={colSpan}>
            <TableRowPlaceholder />
        </td>
    );
};

const isBoolValue = (value: TableCellType): boolean => {
    return typeof value === 'boolean';
};
const renderValue = (text: TableCellType) => {
    if (typeof text === 'string' || typeof text === 'number') {
        return text;
    }

    if (typeof text === 'boolean') {
        return text ? <CircleIcon color={Colors.primary} /> : <CrossIcon color={Colors.gray400} />;
    }

    return '';
};
