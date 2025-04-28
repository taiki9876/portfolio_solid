import { Separator } from '@admin/shared/components/Ui/Separator';
import { ContractSummary, OwnerAdmin } from '@admin/domain/contract/model';
import { OwnerAccount } from '../OwnerAccount';
import { SettingMenuNavigation } from '../SettingMenuNavigation';
import { ContractInfo } from '../ContractInfo';

type Props = {
    contractSummary: ContractSummary;
    ownerAdmin: OwnerAdmin;
    contractId: string;
};
export const ContractDetailContainer = ({ contractSummary, ownerAdmin, contractId }: Props) => {
    return (
        <div>
            <ContractInfo summary={contractSummary} />

            <Separator isBorder={false} />

            <OwnerAccount ownerAdmin={ownerAdmin} />

            <Separator />

            <SettingMenuNavigation contractId={contractId} />
        </div>
    );
};
