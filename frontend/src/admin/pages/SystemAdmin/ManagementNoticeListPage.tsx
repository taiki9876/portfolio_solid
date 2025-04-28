import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { ManagementNoticeTable } from '@admin/features/systemAdmin/managementNoticeList/components/ManagementNoticeTable';
import { ManagementNoticesHeader } from '@admin/features/systemAdmin/managementNoticeList/components/ManagementNoticesHeader';

export const ManagementNoticeListPage = () => {
    return (
        <PageContainer
            headerComponent={<ManagementNoticesHeader />}
            routeNames={[SystemAdminRouteNames.home, SystemAdminRouteNames.managementNoticeList]}
        >
            <ManagementNoticeTable />
        </PageContainer>
    );
};
