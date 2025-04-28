import { RouteNameType } from '@admin/routes/routes.ts';
import { StateCreator } from 'zustand';
import { SystemAdminRouteNameType } from '@admin/routes/routesSystemAdmin';

//基本はRouteNameTypeを利用することでリンク付きになる、文字列だけでいい場合はPlaneItemを利用する
export type PlaneItem = {
    name: string;
};
export const isPlaneItem = (
    target: PlaneItem | LinkItem | SystemAdminRouteNameType | RouteNameType
): target is PlaneItem => {
    return (target as PlaneItem).name !== undefined;
};
export type LinkItem = {
    linkName: string;
    path: string;
};
export const isLinkItem = (
    target: PlaneItem | LinkItem | SystemAdminRouteNameType | RouteNameType
): target is LinkItem => {
    return (target as LinkItem).linkName !== undefined;
};

// パンくずリストの状態
export type BreadcrumbStore = {
    routeNames: (RouteNameType | SystemAdminRouteNameType | PlaneItem | LinkItem)[];
    setBreadcrumb: (
        names: (RouteNameType | SystemAdminRouteNameType | PlaneItem | LinkItem)[]
    ) => void;
};
export const createBreadcrumbStoreSlice: StateCreator<BreadcrumbStore, [], [], BreadcrumbStore> = (
    set
) => ({
    routeNames: [],
    setBreadcrumb: (names: (RouteNameType | SystemAdminRouteNameType | PlaneItem | LinkItem)[]) => {
        set({ routeNames: names });
    },
});
