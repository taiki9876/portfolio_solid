import { SectionCardBox } from '@admin/features/home/components/SectionCardBox';
import { Table } from '@admin/shared/components/Ui/Table';
import { HeaderType } from '@admin/shared/components/Ui/Table/TableHeader';
import { SpaceBetween } from '@admin/shared/components/Layout/FlexBox/SpaceBetween';
import { FlexStart } from '@admin/shared/components/Layout/FlexBox/FlexStart';
import { Checkbox } from '@admin/shared/components/Ui/Button/Checkbox';
import { RowType } from '@admin/shared/components/Ui/Table/TableRow';
import styles from './PublishedContents.module.css';

export const PublishedContents = () => {
    return (
        <SectionCardBox shouldPadding={false}>
            <SpaceBetween className={styles.container}>
                <div className={styles.title}>掲載中コンテンツ</div>
                <FlexStart>
                    {['お知らせ', 'クーポン', 'ギャラリー', 'ホーム', '店舗情報'].map(
                        (label: string, index: number) => (
                            <FlexStart key={`col-${index}`} gap="small" className={styles.checkbox}>
                                <Checkbox size="small" checked={true} /> {label}
                            </FlexStart>
                        )
                    )}
                </FlexStart>
            </SpaceBetween>

            <Table
                tableKey="publishedContents"
                headers={headers}
                rows={dummyData}
                needColumnSelector={true}
                border={true}
                height="514px"
            />
        </SectionCardBox>
    );
};

const headers: HeaderType[] = [
    { label: 'タイトル', key: 'title' },
    { label: '掲載開始', key: 'publishedAt' },
    { label: '掲載数', key: 'publishedCount' },
    { label: '既読数', key: 'readCount' },
    { label: 'クーポン利用数', key: 'couponCount' },
];

const dummyData: RowType[] = [
    { id: 1, values: ['タイトル1', '2021/01/01', '100', '50', '10'] },
    { id: 1, values: ['タイトル2', '2021/01/02', '200', '100', '20'] },
    { id: 1, values: ['タイトル3', '2021/01/03', '300', '150', '30'] },
    { id: 1, values: ['タイトル4', '2021/01/04', '400', '200', '40'] },
    { id: 1, values: ['タイトル5', '2021/01/05', '500', '250', '50'] },
    { id: 1, values: ['タイトル6', '2021/01/06', '600', '300', '60'] },
    { id: 1, values: ['タイトル7', '2021/01/07', '700', '350', '70'] },
    { id: 1, values: ['タイトル8', '2021/01/08', '800', '400', '80'] },
    { id: 1, values: ['タイトル9', '2021/01/09', '900', '450', '90'] },
    { id: 1, values: ['タイトル10', '2021/01/10', '1000', '500', '100'] },
    { id: 1, values: ['タイトル11', '2021/01/11', '1100', '550', '110'] },
    { id: 1, values: ['タイトル12', '2021/01/12', '1200', '600', '120'] },
    { id: 1, values: ['タイトル13', '2021/01/13', '1300', '650', '130'] },
    { id: 1, values: ['タイトル14', '2021/01/14', '1400', '700', '140'] },
    { id: 1, values: ['タイトル15', '2021/01/15', '1500', '750', '150'] },
    { id: 1, values: ['タイトル16', '2021/01/16', '1600', '800', '160'] },
];
