import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { RouteNames } from '@admin/routes/routes';
import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';
import { useAuthStore } from '@admin/shared/state/globalState';
import { canChat } from '@admin/domain/admin/model';

export const InquiryChatPage = () => {
    const { admin } = useAuthStore();

    if (!canChat(admin)) {
        return (
            <PageContainer>
                <div>サポートはチャット閲覧はできません。</div>
            </PageContainer>
        );
    }

    return (
        <PageContainer routeNames={[RouteNames.home, RouteNames.inquiry]}>
            <SectionContainer shouldPadding={false} isHeightFit={true}>
                準備中
            </SectionContainer>
        </PageContainer>
    );
};
