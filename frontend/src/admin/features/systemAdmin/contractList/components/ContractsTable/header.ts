import { HeaderType } from '@admin/shared/components/Ui/Table/TableHeader';

export const headers: HeaderType[] = [
    { label: 'ID', key: 'id' },
    { label: '契約名称', key: 'accountName' },
    { label: 'キー', key: 'contractKey' },
    { label: '会員数', key: 'customerCount' },
    { label: '店舗数', key: 'shopCount' },
    { label: '担当者名', key: 'personInCharge' },
    { label: '担当者電話番号', key: 'tel' },
    { label: '業種', key: 'industry' },
    { label: '契約状態', key: 'contractStatus' },
    { label: 'アプリタイプ', key: 'contractAppType' },
];
