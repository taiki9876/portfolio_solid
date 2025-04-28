import { SpaceBetween } from '@admin/shared/components/Layout/FlexBox/SpaceBetween';
import { ToCreateForm } from './ToCreateForm';
import { ContractSearchInput } from './ContractSearchInput';

export const ContractListHeader = () => {
    return (
        <SpaceBetween>
            <ToCreateForm />
            <ContractSearchInput />
        </SpaceBetween>
    );
};
