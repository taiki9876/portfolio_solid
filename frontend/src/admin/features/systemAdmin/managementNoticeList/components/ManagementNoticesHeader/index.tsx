import { SpaceBetween } from '@admin/shared/components/Layout/FlexBox/SpaceBetween';
import { ActionButton } from '@admin/shared/components/Ui/Button/ActionButton';
import { PlusIcon } from '@admin/shared/components/Ui/Icon/PlusIcon';
import { ManagementNoticesSearchInput } from './ManagementNoticesSearchInput';
import { useOpenManagementNoticeForm } from './CreateManagementNoticeForm/useOpenManagementNoticeForm';

export const ManagementNoticesHeader = () => {
    const { handleCustomerCreateModalOpen } = useOpenManagementNoticeForm();

    return (
        <SpaceBetween>
            <ActionButton
                label="運営からのお知らせを追加"
                onClick={handleCustomerCreateModalOpen}
                icon={PlusIcon}
            />

            <ManagementNoticesSearchInput />
        </SpaceBetween>
    );
};
