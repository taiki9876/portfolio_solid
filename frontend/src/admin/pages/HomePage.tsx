import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { RouteNames } from '@admin/routes/routes';
import { HomeContainer } from '@admin/features/home/components/HomeContainer';

export const HomePage = () => {
    return (
        <PageContainer routeNames={[RouteNames.home]}>
            <HomeContainer />
        </PageContainer>
    );
};
