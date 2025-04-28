import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { RouteNames } from '@admin/routes/routes';

export const SettingPage = () => {
    return <PageContainer routeNames={[RouteNames.home, RouteNames.setting]}>設定</PageContainer>;
};
