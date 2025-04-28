import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { ArrowLeftIcon } from '@admin/shared/components/Ui/Icon/ArrowLeftIcon';
import { Colors } from '@admin/assets/styles/colors';
import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';
import { ShopCreateForm } from '@admin/features/systemAdmin/createShop/components/ShopCreateForm';
import { resolvePath, route } from '@admin/routes/type';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchContractName } from '@admin/features/systemAdmin/shared/hooks/useFetchContractName';

export const ShopCreatePage = () => {
    const { contractId } = useParams<{ contractId: string }>();
    const { contractName, isLoading } = useFetchContractName(contractId);
    const navigate = useNavigate();

    if (contractId === undefined) {
        return;
    }

    const routeNames = () => {
        const extraNames = isLoading
            ? []
            : [
                  {
                      linkName:
                          contractName ?? route(SystemAdminRouteNames.contractDetail).displayName,
                      path: resolvePath(SystemAdminRouteNames.contractDetail, { contractId }),
                  },
                  {
                      linkName: route(SystemAdminRouteNames.shopList).displayName,
                      path: resolvePath(SystemAdminRouteNames.shopList, { contractId }),
                  },
                  SystemAdminRouteNames.shopCreate,
              ];
        return [{ name: '...' }, SystemAdminRouteNames.contractList, ...extraNames];
    };

    return (
        <PageContainer
            pageTitle={{
                label: (
                    <>
                        <ArrowLeftIcon color={Colors.primary} />
                        {route(SystemAdminRouteNames.shopList).displayName}
                    </>
                ),
                onClick: () => {
                    void navigate(resolvePath(SystemAdminRouteNames.shopList, { contractId }));
                },
            }}
            routeNames={routeNames()}
        >
            <SectionContainer>
                <ShopCreateForm />
            </SectionContainer>
        </PageContainer>
    );
};
