import { ActionButton } from '@admin/shared/components/Ui/Button/ActionButton';
import { PlusIcon } from '@admin/shared/components/Ui/Icon/PlusIcon';
import { DownloadIcon } from '@admin/shared/components/Ui/Icon/DownloadIcon';
import { SpaceBetween } from '@admin/shared/components/Layout/FlexBox/SpaceBetween';
import { FlexStart } from '@admin/shared/components/Layout/FlexBox/FlexStart';
import { CustomerSearchInput } from '../CustomerSearchInput';
import { useDownloadCustomers } from './hooks/useDownloadCustomers';
import { useCreateCustomer } from './hooks/useCreateCustomer';

export const CustomerHeader = () => {
    const { handleDownload } = useDownloadCustomers();
    const { handleCustomerCreateModalOpen } = useCreateCustomer();

    return (
        <SpaceBetween>
            <FlexStart gap="medium">
                <ActionButton
                    label="新規登録"
                    onClick={handleCustomerCreateModalOpen}
                    icon={PlusIcon}
                />
                <ActionButton label="CSV出力" onClick={handleDownload} icon={DownloadIcon} />
            </FlexStart>

            <CustomerSearchInput />
        </SpaceBetween>
    );
};
