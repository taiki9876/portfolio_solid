import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from '@admin/shared/state/globalState';
import { InitialScreen } from '@admin/shared/components/Container/AppInitialContainer/InitialScreen';
import { isSystemAdmin } from '@admin/domain/admin/model';
import { RouteConfig } from './routes';
import { SystemAdminRouteConfig } from './routesSystemAdmin';
import { RouteConfigSettingType } from './type';

export const MainContent = () => {
    const { isAdminLoaded, admin } = useAuthStore();

    return (
        <>
            <InitialScreen isInitCompleted={isAdminLoaded} />
            {admin !== undefined && (
                <Routes>
                    {Object.values(isSystemAdmin(admin) ? SystemAdminRouteConfig : RouteConfig).map(
                        (route: RouteConfigSettingType) => (
                            <Route key={route.path} path={route.path} element={<route.page />} />
                        )
                    )}
                </Routes>
            )}
        </>
    );
};
