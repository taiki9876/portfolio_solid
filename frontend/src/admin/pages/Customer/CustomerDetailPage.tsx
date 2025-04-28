import { RouteNames } from '@admin/routes/routes';
import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';
import { DetailHeader } from '@admin/features/customers/customerDetail/components/DetailHeader';
import { DetailContainer } from '@admin/features/customers/customerDetail/components/DetailContainer';
import { ArrowLeftIcon } from '@admin/shared/components/Ui/Icon/ArrowLeftIcon';
import { Colors } from '@admin/assets/styles/colors';

export const CustomersDetailPage = () => {
    return (
        <PageContainer
            routeNames={[RouteNames.home, RouteNames.customers, { name: 'C1234 田中　透' }]}
            pageTitle={{
                label: (
                    <>
                        <ArrowLeftIcon color={Colors.primary} />
                        会員詳細
                    </>
                ),
                onClick: () => {
                    window.history.back();
                },
            }}
            headerComponent={<DetailHeader />}
        >
            <SectionContainer shouldPadding={false}>
                <DetailContainer />
            </SectionContainer>
        </PageContainer>
    );
};
