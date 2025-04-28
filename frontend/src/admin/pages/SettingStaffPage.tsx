import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { RouteNames } from '@admin/routes/routes';

export const SettingStaffPage = () => {
    return (
        <PageContainer routeNames={[RouteNames.home, RouteNames.setting]}>
            スタッフ設定
        </PageContainer>
    );
};
