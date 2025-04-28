import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@admin/shared/components/Ui/Icon/ArrowLeftIcon';
import { Colors } from '@admin/assets/styles/colors';
import { route } from '@admin/routes/type';
import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';
import { useManagementNoticeDetailQuery } from '@admin/features/systemAdmin/managementNoticeDetail/hooks/useManagementNoticeDetailQuery';
import { ManagementNoticeDetail } from '@admin/features/systemAdmin/managementNoticeDetail/components/ManagementNoticeDetail';
import { ManagementNoticeDetailHeader } from '@admin/features/systemAdmin/managementNoticeDetail/components/ManagementNoticeDetailHeader';

export const ManagementNoticeDetailPage = () => {
    const navigate = useNavigate();
    const { noticeId } = useParams<{ noticeId: string }>();
    const { notice, isLoading } = useManagementNoticeDetailQuery(noticeId);

    if (noticeId === undefined) {
        return;
    }

    const routeNames = () => {
        const extraNames = isLoading
            ? []
            : [
                  {
                      name:
                          notice?.title ??
                          route(SystemAdminRouteNames.managementNoticeDetail).displayName,
                  },
              ];
        return [
            SystemAdminRouteNames.home,
            SystemAdminRouteNames.managementNoticeList,
            ...extraNames,
        ];
    };

    return (
        <PageContainer
            pageTitle={{
                label: (
                    <>
                        <ArrowLeftIcon color={Colors.primary} />
                        {route(SystemAdminRouteNames.managementNoticeList).displayName}
                    </>
                ),
                onClick: () => {
                    void navigate(route(SystemAdminRouteNames.managementNoticeList).path);
                },
            }}
            routeNames={routeNames()}
            isLoading={isLoading}
            headerComponent={<ManagementNoticeDetailHeader />}
        >
            <SectionContainer>
                {notice !== undefined && <ManagementNoticeDetail notice={notice} />}
            </SectionContainer>
        </PageContainer>
    );
};
