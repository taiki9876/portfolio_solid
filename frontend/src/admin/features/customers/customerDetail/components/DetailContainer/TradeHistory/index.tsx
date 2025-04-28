import { Table } from '@admin/shared/components/Ui/Table';
import { HeaderType } from '@admin/shared/components/Ui/Table/TableHeader';
import { RowType } from '@admin/shared/components/Ui/Table/TableRow';
import commonStyles from '../DetailContainer.module.css';
import styles from './TableHistory.module.css';

const headers: HeaderType[] = [
    { label: '取引日', key: 'tradeDate' },
    { label: '商品情報', key: 'productInfo' },
    { label: '数量', key: 'quantity' },
    { label: '合計', key: 'total' },
    { label: 'メモ', key: 'memo' },
    { label: '画像', key: 'image' },
];
const dummyRows: RowType[] = [
    { id: 1, values: ['2021/06/01', '商品名', '1', '1000', 'あり', 'あり'] },
    { id: 2, values: ['2021/06/02', '商品名', '2', '2000', 'あり', 'あり'] },
    { id: 3, values: ['2021/06/03', '商品名', '3', '3000', 'あり', 'あり'] },
    { id: 3, values: ['2021/06/04', '商品名', '4', '4000', 'あり', 'あり'] },
    { id: 3, values: ['2021/06/05', '商品名', '5', '5000', 'あり', 'あり'] },
    { id: 3, values: ['2021/06/06', '商品名', '6', '6000', 'あり', 'あり'] },
    { id: 3, values: ['2021/06/07', '商品名', '7', '7000', 'あり', 'あり'] },
    { id: 3, values: ['2021/06/08', '商品名', '8', '8000', 'あり', 'あり'] },
    { id: 3, values: ['2021/06/09', '商品名', '9', '9000', 'あり', 'あり'] },
    { id: 3, values: ['2021/06/10', '商品名', '10', '10000', 'あり', 'あり'] },
];
export const TradeHistory = () => {
    return (
        <div className={commonStyles.infoSection}>
            <div className={`${commonStyles.sectionTitleBox} ${styles.tradeHistoryTitleBox}`}>
                <span>取引履歴</span>
                <span className={styles.priceAmount}>総取引金額：100,000円</span>
            </div>
            <div className={styles.table}>
                <Table tableKey="tradeHistory" headers={headers} rows={dummyRows} />
            </div>
        </div>
    );
};
