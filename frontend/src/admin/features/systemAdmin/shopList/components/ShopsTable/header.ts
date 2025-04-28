import { HeaderType } from '@admin/shared/components/Ui/Table/TableHeader';
import { Shop } from '@admin/domain/shop/model';
import { formatDate } from '@admin/shared/util/dateUtil';
import { RowType } from '@admin/shared/components/Ui/Table/TableRow';

export const headers: HeaderType[] = [
    { label: 'ID', key: 'id' },
    { label: '店舗名', key: 'name' },
    { label: '店舗表示名', key: 'appDisplayName' },
    { label: '会員数', key: 'customerCount' },
    { label: '登録日', key: 'createdAt' },
];

export const createRows = (shops: Shop[]): RowType[] => {
    return shops.map((shop) => ({
        id: shop.id,
        values: [
            shop.id,
            shop.name,
            shop.appDisplayName,
            shop.customerCount,
            formatDate(shop.createdAt, { withTime: true, withWeekday: true }),
        ],
    }));
};
