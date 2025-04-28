import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { RouteNames } from '@admin/routes/routes';
import { ManagementNoticesTable } from '@admin/features/managementNotices/components/ManagementNoticesTable';

export const ManagementNoticePage = () => {
    return (
        <PageContainer
            pageTitle="運営からのお知らせ"
            routeNames={[RouteNames.home, RouteNames.managementNotices]}
        >
            <ManagementNoticesTable />
        </PageContainer>
    );
};
