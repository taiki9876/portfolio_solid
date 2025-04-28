import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { RouteNames } from '@admin/routes/routes';
import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';

export const InquiryRichMenuPage = () => {
    return (
        <PageContainer routeNames={[RouteNames.home, RouteNames.inquiry]}>
            <SectionContainer shouldPadding={false} isHeightFit={true}>
                <div>リッチメニュー設定 準備中</div>
            </SectionContainer>
        </PageContainer>
    );
};
