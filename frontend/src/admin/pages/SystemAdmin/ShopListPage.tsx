import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { ArrowLeftIcon } from '@admin/shared/components/Ui/Icon/ArrowLeftIcon';
import { Colors } from '@admin/assets/styles/colors';
import { ShopsTable } from '@admin/features/systemAdmin/shopList/components/ShopsTable';
import { ShopListHeader } from '@admin/features/systemAdmin/shopList/components/ShopListHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { resolvePath, route } from '@admin/routes/type';
import { useFetchContractName } from '@admin/features/systemAdmin/shared/hooks/useFetchContractName';

export const ShopListPage = () => {
    const { contractId } = useParams<{ contractId: string }>();
    const { contractName, isLoading: fetchNameLoading } = useFetchContractName(contractId);

    const navigate = useNavigate();
    if (contractId === undefined) {
        return;
    }

    const routeNames = () => {
        const extraNames = fetchNameLoading
            ? []
            : [
                  {
                      linkName:
                          contractName ?? route(SystemAdminRouteNames.contractDetail).displayName,
                      path: resolvePath(SystemAdminRouteNames.contractDetail, { contractId }),
                  },
                  SystemAdminRouteNames.shopList,
              ];
        return [{ name: '...' }, SystemAdminRouteNames.contractList, ...extraNames];
    };

    return (
        <PageContainer
            pageTitle={
                fetchNameLoading
                    ? undefined
                    : {
                          label: (
                              <>
                                  <ArrowLeftIcon color={Colors.primary} />
                                  {contractName}
                              </>
                          ),
                          onClick: () => {
                              void navigate(
                                  resolvePath(SystemAdminRouteNames.contractDetail, { contractId })
                              );
                          },
                      }
            }
            routeNames={routeNames()}
            headerComponent={<ShopListHeader />}
        >
            <ShopsTable />
        </PageContainer>
    );
};
