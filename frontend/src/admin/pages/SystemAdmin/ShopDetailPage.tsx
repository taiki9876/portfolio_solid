import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { ArrowLeftIcon } from '@admin/shared/components/Ui/Icon/ArrowLeftIcon';
import { Colors } from '@admin/assets/styles/colors';
import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';
import { useNavigate, useParams } from 'react-router-dom';
import { resolvePath, route } from '@admin/routes/type';
import { useShopDetailQuery } from '@admin/features/systemAdmin/shopDetail/hooks/useShopDetailQuery';
import { ShopDetail } from '@admin/features/systemAdmin/shopDetail/components/ShopDetail';
import { useFetchContractName } from '@admin/features/systemAdmin/shared/hooks/useFetchContractName';
import { ShopDetailHeader } from '@admin/features/systemAdmin/shopDetail/components/ShopDetailHeader';

export const ShopDetailPage = () => {
    const navigate = useNavigate();
    const { contractId, shopId } = useParams<{ contractId: string; shopId: string }>();
    const { contractName, isLoading: fetchNameLoading } = useFetchContractName(contractId);

    const { shop, isLoading } = useShopDetailQuery(contractId, shopId);
    if (contractId === undefined) {
        return;
    }

    const routeNames = () => {
        const extraNames =
            fetchNameLoading || isLoading
                ? []
                : [
                      {
                          linkName:
                              contractName ??
                              route(SystemAdminRouteNames.contractDetail).displayName,
                          path: resolvePath(SystemAdminRouteNames.contractDetail, { contractId }),
                      },
                      {
                          linkName: route(SystemAdminRouteNames.shopList).displayName,
                          path: resolvePath(SystemAdminRouteNames.shopList, { contractId }),
                      },
                      { name: shop?.name ?? route(SystemAdminRouteNames.shopDetail).displayName },
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
            isLoading={isLoading}
            headerComponent={<ShopDetailHeader />}
        >
            <SectionContainer>{shop !== undefined && <ShopDetail shop={shop} />}</SectionContainer>
        </PageContainer>
    );
};
