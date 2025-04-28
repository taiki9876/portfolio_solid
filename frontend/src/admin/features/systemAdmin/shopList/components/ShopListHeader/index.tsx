import { SpaceBetween } from '@admin/shared/components/Layout/FlexBox/SpaceBetween';
import { ToCreatePage } from './ToCreatePage';
import { SearchShopInput } from './SearchShopInput';

export const ShopListHeader = () => {
    return (
        <SpaceBetween>
            <ToCreatePage />
            <SearchShopInput />
        </SpaceBetween>
    );
};
