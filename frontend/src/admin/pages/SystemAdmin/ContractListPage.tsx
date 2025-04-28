import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { ContractsTable } from '@admin/features/systemAdmin/contractList/components/ContractsTable';
import { ContractListHeader } from '@admin/features/systemAdmin/contractList/components/ContractListHeader';

export const ContractListPage = () => {
    return (
        <PageContainer
            routeNames={[SystemAdminRouteNames.home, SystemAdminRouteNames.contractList]}
            headerComponent={<ContractListHeader />}
        >
            <ContractsTable />
        </PageContainer>
    );
};
