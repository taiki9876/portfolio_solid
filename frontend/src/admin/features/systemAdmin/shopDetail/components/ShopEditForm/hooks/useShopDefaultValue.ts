import { useEffect, useState } from 'react';
import { ShopFormValues } from '@admin/domain/shop/form/formValue';
import { Shop } from '@admin/domain/shop/model';

export const useShopDefaultValue = (shop: Shop) => {
    const [defaultValues, setDefaultValues] = useState<ShopFormValues>({
        name: shop.name,
        appDisplayName: shop.appDisplayName ?? '',
        'images[0]': undefined,
        'images[1]': undefined,
        'images[2]': undefined,
        'images[3]': undefined,
        'images[4]': undefined,
        address: shop.address ?? '',
        businessHours: shop.businessHours ?? '',
        tel: shop.tel ?? '',
        rest: shop.rest ?? '',
        hpUrl: shop.hpUrl ?? '',
        mapUrl: shop.mapUrl ?? '',
        prelusion: shop.prelusion ?? '',
    });

    useEffect(() => {
        setDefaultValues({
            name: shop.name,
            appDisplayName: shop.appDisplayName ?? '',
            'images[0]': shop.images[0] ?? undefined,
            'images[1]': shop.images[1] ?? undefined,
            'images[2]': shop.images[2] ?? undefined,
            'images[3]': shop.images[3] ?? undefined,
            'images[4]': shop.images[4] ?? undefined,
            address: shop.address ?? '',
            businessHours: shop.businessHours ?? '',
            tel: shop.tel ?? '',
            rest: shop.rest ?? '',
            hpUrl: shop.hpUrl ?? '',
            mapUrl: shop.mapUrl ?? '',
            prelusion: shop.prelusion ?? '',
        });
    }, [shop]);
    return { defaultValues };
};
