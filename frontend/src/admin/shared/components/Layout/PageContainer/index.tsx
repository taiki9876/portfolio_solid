import { ReactNode, useEffect } from 'react';
import { RouteNameType } from '@admin/routes/routes';
import { SIDE_NAV_WIDTH } from '@admin/constants';
import { useBreadcrumbStore } from '@admin/shared/state/globalState';
import { LinkItem, PlaneItem } from '@admin/shared/state/slice/ui/breadcrumbStore';
import { SystemAdminRouteNameType } from '@admin/routes/routesSystemAdmin';
import { InitialScreen } from '@admin/shared/components/Container/AppInitialContainer/InitialScreen';
import { LoadingOverlay } from '@admin/shared/components/Ui/Loading/LoadingOverlay';
import { PageTitle, PageTitleType } from './PageTitle';
import styles from './PageContainer.module.css';

type Props = {
    routeNames?: (RouteNameType | SystemAdminRouteNameType | PlaneItem | LinkItem)[];
    pageTitle?: PageTitleType;
    headerComponent?: ReactNode;
    isLoading?: boolean;
    children: ReactNode;
};
export const PageContainer = ({
    routeNames,
    pageTitle,
    headerComponent,
    isLoading = false,
    children,
}: Props) => {
    const { setBreadcrumb } = useBreadcrumbStore();

    useEffect(() => {
        // パンくずリスト生成
        if (routeNames !== undefined) {
            setBreadcrumb(routeNames);
        }
    }, [routeNames, setBreadcrumb]);

    return (
        <div className={styles.content} style={{ paddingLeft: `${SIDE_NAV_WIDTH + 24}px` }}>
            <InitialScreen isInitCompleted={!isLoading} />
            {isLoading && <LoadingOverlay backgroundBlur={false} />}
            {(pageTitle !== undefined || headerComponent !== undefined) && (
                <div className={styles.pageHeaderBox}>
                    {pageTitle !== undefined && <PageTitle title={pageTitle} />}
                    {headerComponent}
                </div>
            )}
            {children}
        </div>
    );
};
