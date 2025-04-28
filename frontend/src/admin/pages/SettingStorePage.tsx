import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { RouteNames } from '@admin/routes/routes';

export const SettingStorePage = () => {
    return (
        <PageContainer routeNames={[RouteNames.home, RouteNames.setting]}>店舗設定</PageContainer>
    );
};
