import { ComponentType } from 'react';
import { RouteConfig, RouteNameType } from '@admin/routes/routes';
import { SystemAdminRouteConfig, SystemAdminRouteNameType } from '@admin/routes/routesSystemAdmin';

export type RouteConfigSettingType = {
    path: string;
    displayName: string;
    page: ComponentType;
};

/** ルーティングヘルパー */
export const route = (name: RouteNameType | SystemAdminRouteNameType): RouteConfigSettingType => {
    if (name in SystemAdminRouteConfig) {
        return SystemAdminRouteConfig[name as SystemAdminRouteNameType];
    }

    if (name in RouteConfig) {
        return RouteConfig[name as RouteNameType];
    }

    throw new Error('There are no routes configured.');
};
/** パス生成ヘルパー 動的ルーティング[:customerId]を置換する */
export const resolvePath = (
    name: RouteNameType | SystemAdminRouteNameType,
    params: Record<string, string>
) => {
    let path: string = route(name).path;
    Object.entries(params).forEach(([key, value]) => {
        path = path.replace(`:${key}`, value);
    });
    return path;
};
