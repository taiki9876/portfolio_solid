import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { ChangeAccountForm } from '@admin/features/systemAdmin/changeAccount/components/ChangeAccountForm';
import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';

export const ChangeSupportAccountPage = () => {
    return (
        <PageContainer
            routeNames={[SystemAdminRouteNames.home, SystemAdminRouteNames.changeSupportAccount]}
            pageTitle="サポートアカウント 切り替え"
        >
            <SectionContainer shouldPadding={false}>
                <ChangeAccountForm />
            </SectionContainer>
        </PageContainer>
    );
};
