import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { ArrowLeftIcon } from '@admin/shared/components/Ui/Icon/ArrowLeftIcon';
import { Colors } from '@admin/assets/styles/colors';
import { useNavigate, useParams } from 'react-router-dom';
import { route } from '@admin/routes/type';
import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';
import { ContractDetailContainer } from '@admin/features/systemAdmin/contractDetail/components/ContractDetailContainer';
import { useContractDetailQuery } from '@admin/features/systemAdmin/contractDetail/hooks/useContractDetailQuery';
import { SomeScreenPlaceholder } from '@admin/shared/components/Ui/Placeholder/SomeScreenPlaceholder';
import { ContractDetailHeader } from '@admin/features/systemAdmin/contractDetail/components/ContractDetailHeader';

export const ContractDetailPage = () => {
    const navigate = useNavigate();
    const { contractId } = useParams<{ contractId: string }>();
    const { summary, isLoading } = useContractDetailQuery(contractId);

    const routeNames = () => {
        const contractName = isLoading
            ? []
            : [
                  {
                      name:
                          summary?.contractSummary.name ??
                          route(SystemAdminRouteNames.contractDetail).displayName,
                  },
              ];
        return [SystemAdminRouteNames.home, SystemAdminRouteNames.contractList, ...contractName];
    };

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
            routeNames={routeNames()}
            headerComponent={
                summary !== undefined && (
                    <ContractDetailHeader contractKey={summary.contractSummary.key} />
                )
            }
            isLoading={isLoading}
        >
            <SectionContainer>
                {isLoading ? (
                    <SomeScreenPlaceholder />
                ) : summary !== undefined && contractId !== undefined ? (
                    <ContractDetailContainer
                        contractSummary={summary.contractSummary}
                        ownerAdmin={summary.ownerAdmin}
                        contractId={contractId}
                    />
                ) : (
                    <div>契約情報の取得に失敗しました。</div>
                )}
            </SectionContainer>
        </PageContainer>
    );
};
