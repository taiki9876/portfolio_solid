import { FlexEnd } from '@admin/shared/components/Layout/FlexBox/FlexEnd';
import { ActionButton } from '@admin/shared/components/Ui/Button/ActionButton';
import { PeopleIcon } from '@admin/shared/components/Ui/Icon/PeopleIcon';
import { useChangeSupportAccount } from '@admin/features/systemAdmin/shared/hooks/useChangeSupportAccount';

type Props = {
    contractKey: string;
};
export const ContractDetailHeader = ({ contractKey }: Props) => {
    const { handleChangeAccount } = useChangeSupportAccount(contractKey);

    return (
        <FlexEnd>
            <ActionButton
                label="サポートログイン"
                onClick={handleChangeAccount}
                icon={PeopleIcon}
            />
        </FlexEnd>
    );
};
