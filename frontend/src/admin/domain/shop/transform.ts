import { dayjs } from '@admin/shared/lib/dayjs';
import { Shop } from './model.ts';

// API取得データの変換用メソッド;
export type ShopApiResource = Shop;
export const convertToShop = (resource: ShopApiResource): Shop => {
    return {
        id: resource.id,
        name: resource.name,
        appDisplayName: resource.appDisplayName,
        images: resource.images,
        businessHours: resource.businessHours,
        rest: resource.rest,
        tel: resource.tel,
        address: resource.address,
        prelusion: resource.prelusion,
        hpUrl: resource.hpUrl,
        mapUrl: resource.mapUrl,
        customerCount: resource.customerCount,
        createdAt: dayjs(resource.createdAt).toDate(),
    };
};
