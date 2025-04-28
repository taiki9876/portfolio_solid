import type { Meta, StoryObj } from '@storybook/react';
import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';
import { random } from '@admin/shared/util/arrayUtil';
import { Colors } from '@admin/assets/styles/colors';
import { HeaderType } from '@admin/shared/components/Ui/Table/TableHeader';
import { randomNumber } from '@admin/shared/util/numberUtil';
import { RowType } from '@admin/shared/components/Ui/Table/TableRow';
import { Table } from './index';

/*
 * 汎用的なテーブルコンポーネント
 */
const meta: Meta<typeof Table> = {
    title: 'Ui/Table',
    component: Table,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ backgroundColor: Colors.pageBackgroundGray, padding: '2rem' }}>
                <SectionContainer shouldPadding={false}>
                    <Story />
                </SectionContainer>
            </div>
        ),
    ],
    excludeStories: ['dummyHeader', 'dummyRows'],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

const dummyHeader: HeaderType[] = [
    { label: '会員コード', key: 'customerCode' },
    { label: '会員番号', key: 'customerNumber' },
    { label: '氏名', key: 'name' },
    { label: '生年月日', key: 'birth' },
    { label: '性別', key: 'gender' },
    { label: '会員ランク', key: 'customerRank' },
    { label: '親会員', key: 'parentCustomerCode' },
    { label: 'インストール', key: 'isInstall' },
    { label: '登録日', key: 'createdAt' },
    { label: '最終ログイン日', key: 'lastLoginAt' },
    { label: '最終来店日', key: 'lastVisitAt' },
    { label: '保有ポイント数', key: 'numOfPointsHeld' },
];
export const dummyRows: RowType[] = new Array(15).fill(null).map(() => ({
    id: randomNumber(),
    values: [
        '10001001',
        687940,
        '田中　智',
        '1985/09/29',
        '不明',
        '一般会員',
        '10001002',
        random([true, false]),
        '2023/09/29',
        '2025/01/04',
        '2024/12/11',
        544,
    ],
}));

export const Example: Story = {
    args: {
        tableKey: 'customerTable',
        headers: dummyHeader,
        rows: dummyRows,
    },
};
