import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { RouteNames } from '@admin/routes/routes';
import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';

export const InquiryAutoResponsePage = () => {
    return (
        <PageContainer routeNames={[RouteNames.home, RouteNames.inquiry]}>
            <SectionContainer shouldPadding={false} isHeightFit={true}>
                <div>自動応答設定 準備中</div>
            </SectionContainer>
        </PageContainer>
    );
};
