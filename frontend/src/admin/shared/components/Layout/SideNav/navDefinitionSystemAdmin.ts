import { DashboardIcon } from '@admin/shared/components/Ui/Icon/DashboardIcon';
import { SystemAdminRouteConfig, SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { PeopleIcon } from '@admin/shared/components/Ui/Icon/PeopleIcon';
import { HandShakeIcon } from '@admin/shared/components/Ui/Icon/HandShakeIcon';
import { PlusIcon } from '@admin/shared/components/Ui/Icon/PlusIcon';
import { BellIcon } from '@admin/shared/components/Ui/Icon/BellIcon';
import { SideNavCategoryType, SideNavLinkType } from './type';

// サイドナビゲーションに表示するものはここに登録する システム管理者用
export const SystemAdminSideNavLinks: (SideNavLinkType | SideNavCategoryType)[] = [
    {
        type: 'page',
        config: SystemAdminRouteConfig[SystemAdminRouteNames.home],
        icon: DashboardIcon,
    },
    {
        type: 'category',
        pathPrefix: '/admin/system-admin/contracts',
        label: '契約アカウント',
        icon: HandShakeIcon,
        rootChild: SystemAdminRouteNames.contractList,
        children: [
            {
                type: 'page',
                config: SystemAdminRouteConfig[SystemAdminRouteNames.contractList],
                icon: HandShakeIcon,
            },
            {
                type: 'page',
                config: SystemAdminRouteConfig[SystemAdminRouteNames.contractCreate],
                icon: PlusIcon,
            },
        ],
    },
    {
        type: 'page',
        config: SystemAdminRouteConfig[SystemAdminRouteNames.managementNoticeList],
        icon: BellIcon,
    },
    {
        type: 'page',
        config: SystemAdminRouteConfig[SystemAdminRouteNames.changeSupportAccount],
        icon: PeopleIcon,
    },
];
