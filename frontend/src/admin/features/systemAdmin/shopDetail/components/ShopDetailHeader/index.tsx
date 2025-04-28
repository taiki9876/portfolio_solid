import { FlexEnd } from '@admin/shared/components/Layout/FlexBox/FlexEnd';
import { useShopDeleteQuery } from '@admin/features/systemAdmin/shopDetail/hooks/useShopDeleteQuery';
import { ActionButton } from '@admin/shared/components/Ui/Button/ActionButton';
import { TrashIcon } from '@admin/shared/components/Ui/Icon/TrashIcon';
import { Colors } from '@admin/assets/styles/colors';

export const ShopDetailHeader = () => {
    const { handleDeleteShop } = useShopDeleteQuery();

    const handleClick = () => {
        if (confirm('本当に削除しますか？')) {
            handleDeleteShop();
        }
    };

    return (
        <FlexEnd>
            <ActionButton
                label="削除"
                onClick={handleClick}
                icon={() => <TrashIcon color={Colors.red} />}
                variant="danger"
            />
        </FlexEnd>
    );
};
