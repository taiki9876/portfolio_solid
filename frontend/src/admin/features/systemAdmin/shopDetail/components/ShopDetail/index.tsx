import { Shop, ShopImage } from '@admin/domain/shop/model';
import { SectionTitle } from '@admin/shared/components/Ui/DetailComponents/SectionTitle';
import {
    InfoItemRow,
    InfoItemType,
} from '@admin/shared/components/Ui/DetailComponents/InfoItemRow';
import { formatDate } from '@admin/shared/util/dateUtil';
import { FlexStart } from '@admin/shared/components/Layout/FlexBox/FlexStart';
import { ItemLabel } from '@admin/shared/components/Ui/DetailComponents/InfoItemRow/ItemLabel';
import { ImageItem } from '@admin/shared/components/Ui/DetailComponents/InfoItemRow/ImageItem';
import { InfoItemContainer } from '@admin/shared/components/Ui/DetailComponents/InfoItemRow/InfoItemcontainer';
import { useOpenShopForm } from '../ShopEditForm/hooks/useOpenShopForm';

type Props = {
    shop: Shop;
};
export const ShopDetail = ({ shop }: Props) => {
    const { handleOpenContractForm } = useOpenShopForm(shop);

    return (
        <>
            <SectionTitle
                title={shop.name}
                onEdit={{ label: '編集', onClick: handleOpenContractForm }}
            />
            <div>
                {convertShopInfo(shop).map((info) => {
                    if (info.key === 'images') {
                        return (
                            <InfoItemContainer key={info.key} isWrap={true}>
                                <ItemLabel label="画像" />
                                <FlexStart>
                                    {shop.images.map((image: ShopImage) => {
                                        return <ImageItem key={image.id} src={image.path} />;
                                    })}
                                </FlexStart>
                            </InfoItemContainer>
                        );
                    }
                    return <InfoItemRow key={info.key} columns={[info]} labelWidth={110} />;
                })}
            </div>
        </>
    );
};

// ラベルとキーの対応表
const shopLabels: { [K in keyof Shop]?: string } = {
    id: 'ID',
    name: '名前',
    appDisplayName: 'アプリ表示店舗名',
    images: '画像',
    address: '住所',
    businessHours: '営業時間',
    tel: '電話番号',
    rest: '定休日',
    hpUrl: 'HP URL',
    mapUrl: '地図 URL',
    prelusion: '紹介文',
    customerCount: '会員数',
    createdAt: '登録日',
};
// 変換関数
const convertShopInfo = (shop: Shop): InfoItemType[] => {
    return Object.keys(shopLabels)
        .filter((key) => key in shop)
        .map((key) => {
            let value = shop[key as keyof Shop] ?? '';
            if (key === 'createdAt') {
                value = formatDate(value as Date, { withTime: true, withWeekday: true });
            }
            if (key === 'images') {
                value = '';
            }

            return {
                key,
                label: shopLabels[key as keyof Shop]!,
                value: value as string | number,
                type: ['hpUrl', 'mapUrl'].includes(key) ? 'link' : 'text',
            };
        });
};
