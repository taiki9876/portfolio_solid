import { ItemLabel } from '@admin/shared/components/Ui/DetailComponents/InfoItemRow/ItemLabel';
import { ImageItem } from '@admin/shared/components/Ui/DetailComponents/InfoItemRow/ImageItem';
import { UrlMessage } from '@admin/shared/components/Ui/Typography/UrlMessage';
import styles from './InfoItemRow.module.css';
import { InfoItemContainer } from './InfoItemcontainer';

export type InfoItemType = {
    key: string;
    label: string;
    value: string | number;
    type?: 'text' | 'link' | 'image'; //default = text
};
type Props = {
    columns: InfoItemType[];
    labelWidth?: number;
    isWrap?: boolean;
};
export const InfoItemRow = ({ columns, labelWidth, isWrap = false }: Props) => {
    if (columns.length > 2) {
        throw new Error('アイテムは2カラムレイアウトです。最大2つの要素を指定してください。');
    }

    const isFull = columns.length === 1;
    return (
        <div className={styles.row}>
            {columns.map((column) => (
                <InfoItemContainer key={column.key} isFull={isFull} isWrap={isWrap}>
                    <ItemLabel label={column.label} labelWidth={labelWidth} />
                    {column.type === 'image' ? (
                        <ImageItem src={column.value as string} />
                    ) : column.type === 'link' ? (
                        <div className={styles.value}>
                            <UrlMessage contentKey={column.key} content={column.value as string} />
                        </div>
                    ) : (
                        <div className={styles.value}>{column.value}</div>
                    )}
                </InfoItemContainer>
            ))}
        </div>
    );
};
