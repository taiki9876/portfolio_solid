import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';
import { SystemAdminHome } from '@admin/features/systemAdmin/SystemAdminHome';

export const HomePage = () => {
    return (
        <PageContainer routeNames={[SystemAdminRouteNames.home]}>
            <SectionContainer>
                <SystemAdminHome />
            </SectionContainer>
        </PageContainer>
    );
};
