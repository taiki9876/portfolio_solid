import { HeaderType } from '@admin/shared/components/Ui/Table/TableHeader';

export const header: HeaderType[] = [
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
