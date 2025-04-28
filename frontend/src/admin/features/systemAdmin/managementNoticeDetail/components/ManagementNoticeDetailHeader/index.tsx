import { FlexEnd } from '@admin/shared/components/Layout/FlexBox/FlexEnd';
import { ActionButton } from '@admin/shared/components/Ui/Button/ActionButton';
import { TrashIcon } from '@admin/shared/components/Ui/Icon/TrashIcon';
import { Colors } from '@admin/assets/styles/colors';
import { useManagementNoticeDeleteQuery } from '../../hooks/useManagementNoticeDeleteQuery';

export const ManagementNoticeDetailHeader = () => {
    const { handleDeleteManagementNotice } = useManagementNoticeDeleteQuery();
    const handleClick = () => {
        if (confirm('削除してもよろしいですか？')) {
            handleDeleteManagementNotice();
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
