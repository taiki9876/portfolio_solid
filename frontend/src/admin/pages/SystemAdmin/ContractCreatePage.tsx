import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { ArrowLeftIcon } from '@admin/shared/components/Ui/Icon/ArrowLeftIcon';
import { Colors } from '@admin/assets/styles/colors';
import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';
import { ContractCreateForm } from '@admin/features/systemAdmin/createContract/components/ContractCreateForm';
import { route } from '@admin/routes/type';
import { useNavigate } from 'react-router-dom';

export const ContractCreatePage = () => {
    const navigate = useNavigate();
    return (
        <PageContainer
            pageTitle={{
                label: (
                    <>
                        <ArrowLeftIcon color={Colors.primary} />
                        {route(SystemAdminRouteNames.contractList).displayName}
                    </>
                ),
                onClick: () => {
                    void navigate(route(SystemAdminRouteNames.contractList).path);
                },
            }}
            routeNames={[
                SystemAdminRouteNames.home,
                SystemAdminRouteNames.contractList,
                SystemAdminRouteNames.contractCreate,
            ]}
        >
            <SectionContainer>
                <ContractCreateForm />
            </SectionContainer>
        </PageContainer>
    );
};
