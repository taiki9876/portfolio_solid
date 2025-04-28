import { FormInputType, FormType } from '@admin/shared/lib/reactHookForm/components/InputField';
import { THUMBNAIL_SIZE_16_9 } from '@admin/constants';
import { rules, ShopFormValues } from './formValue';

//---- 契約情報の入力項目
export const inputOfShopInfo: FormInputType<ShopFormValues>[] = [
    {
        label: undefined,
        placeholder: '〇〇支店',
        name: 'name',
        isRequired: true,
        rules: rules.name,
        formType: 'text',
    },
];
//---- アプリ系設定 - 画像
export const inputOfShopForAppImage: FormInputType<ShopFormValues>[] = [
    'images[0]',
    'images[1]',
    'images[2]',
    'images[3]',
    'images[4]',
].map((fieldKey) => {
    return {
        label: fieldKey === 'images[0]' ? '店舗画像(最大5枚)' : ' ',
        placeholder: '推奨サイズ (16:9)',
        name: fieldKey as keyof ShopFormValues,
        isRequired: false,
        rules: rules.image,
        formType: 'image' as FormType,
        imageOptions: {
            contentKey: fieldKey,
            size: THUMBNAIL_SIZE_16_9,
            initialImagePath: undefined, //NOTE: 編集時には画像パスを設定している
        },
    };
});
//---- アプリ系設定
export const inputOfShopForApp: FormInputType<ShopFormValues>[] = [
    {
        label: 'アプリ表示店舗名',
        placeholder: 'カフェ大吉〇〇支店',
        name: 'appDisplayName',
        isRequired: false,
        rules: rules.appDisplayName,
        formType: 'text',
    },
    {
        label: '画像', //NOTE: UIで表示する時にinputOfShopForAppImageを差し込んでいる。もっと良い方法がないか検討
        placeholder: '',
        name: 'images[0]',
        isRequired: false,
        rules: rules.image,
        formType: 'image',
    },
    {
        label: '住所',
        placeholder: '〇〇県〇〇市〇〇町',
        name: 'address',
        isRequired: false,
        rules: rules.address,
        formType: 'text',
    },
    {
        label: '営業時間',
        placeholder: '11:00 ~ 20:00',
        name: 'businessHours',
        isRequired: false,
        rules: rules.businessHours,
        formType: 'textarea',
    },
    {
        label: 'TEL',
        placeholder: '0000-00-0000',
        name: 'tel',
        isRequired: false,
        rules: rules.tel,
        formType: 'text',
    },
    {
        label: '定休日',
        placeholder: '水曜日',
        name: 'rest',
        isRequired: false,
        rules: rules.rest,
        formType: 'textarea',
    },
    {
        label: 'ホームページURL',
        placeholder: 'https://example.com',
        name: 'hpUrl',
        isRequired: false,
        rules: rules.hpUrl,
        formType: 'text',
    },
    {
        label: 'マップURL(Googleマップ)',
        placeholder: 'https://example.com/map',
        name: 'mapUrl',
        isRequired: false,
        rules: rules.mapUrl,
        formType: 'text',
    },
    {
        label: '紹介文',
        placeholder: '〇〇支店は〇〇です。',
        name: 'prelusion',
        isRequired: false,
        rules: rules.prelusion,
        formType: 'textarea',
        textAreaOptions: {
            rows: 4,
        },
    },
];
