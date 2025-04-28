import { ComponentType } from 'react';
import { RouteConfigSettingType } from '@admin/routes/type';
import { RouteNameType } from '@admin/routes/routes';
import { SystemAdminRouteNameType } from '@admin/routes/routesSystemAdmin';

export type SideNavLinkType = {
    type: 'page';
    config: RouteConfigSettingType;
    icon: ComponentType<{ color: string }>;
    allowPartialMatch?: boolean; //ナビゲーションハイライト - パスが先頭一致でハイライトするか？
};

export type SideNavCategoryType = {
    type: 'category';
    pathPrefix: string;
    label: string;
    icon: ComponentType<{ color: string }>;
    rootChild: RouteNameType | SystemAdminRouteNameType;
    children: SideNavLinkType[];
};
