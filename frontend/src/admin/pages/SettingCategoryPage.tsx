import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { RouteNames } from '@admin/routes/routes';

export const SettingCategoryPage = () => {
    return (
        <PageContainer routeNames={[RouteNames.home, RouteNames.setting]}>
            カテゴリ設定
        </PageContainer>
    );
};
