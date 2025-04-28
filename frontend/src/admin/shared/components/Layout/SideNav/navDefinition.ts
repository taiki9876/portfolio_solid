import { RouteConfig, RouteNames } from '@admin/routes/routes';
import { DashboardIcon } from '@admin/shared/components/Ui/Icon/DashboardIcon';
import { PeopleIcon } from '@admin/shared/components/Ui/Icon/PeopleIcon';
import { ChatIcon } from '@admin/shared/components/Ui/Icon/ChatIcon';
import { SettingIcon } from '@admin/shared/components/Ui/Icon/SettingIcon';
import { MapIcon } from '@admin/shared/components/Ui/Icon/MapIcon';
import { FolderIcon } from '@admin/shared/components/Ui/Icon/FolderIcon';
import { CircleIcon } from '@admin/shared/components/Ui/Icon/CircleIcon';
import { KebabMenuIcon } from '@admin/shared/components/Ui/Icon/KebabMenuIcon';
import { RobotIcon } from '@admin/shared/components/Ui/Icon/RobotIcon';
import { BellIcon } from '@admin/shared/components/Ui/Icon/BellIcon';
import { SideNavCategoryType, SideNavLinkType } from './type';

// サイドナビゲーションに表示するものはここに登録する
export const SideNavLinks: (SideNavLinkType | SideNavCategoryType)[] = [
    { type: 'page', config: RouteConfig[RouteNames.home], icon: DashboardIcon },
    {
        type: 'page',
        config: RouteConfig[RouteNames.customers],
        icon: PeopleIcon,
        allowPartialMatch: true,
    },
    {
        type: 'category',
        pathPrefix: '/admin/inquiry',
        label: 'お問い合わせ',
        icon: ChatIcon,
        rootChild: RouteNames.inquiry,
        children: [
            { type: 'page', config: RouteConfig[RouteNames.inquiry], icon: ChatIcon },
            { type: 'page', config: RouteConfig[RouteNames.inquiryAutoResponse], icon: RobotIcon },
            { type: 'page', config: RouteConfig[RouteNames.inquiryRichMenu], icon: KebabMenuIcon },
        ],
    },
    { type: 'page', config: RouteConfig[RouteNames.managementNotices], icon: BellIcon },
    {
        type: 'category',
        pathPrefix: '/admin/setting/',
        label: '設定',
        icon: SettingIcon,
        rootChild: RouteNames.setting,
        children: [
            { type: 'page', config: RouteConfig[RouteNames.setting], icon: SettingIcon },
            { type: 'page', config: RouteConfig[RouteNames.settingStore], icon: MapIcon },
            { type: 'page', config: RouteConfig[RouteNames.settingStaff], icon: PeopleIcon },
            { type: 'page', config: RouteConfig[RouteNames.settingCategory], icon: FolderIcon },
        ],
    },
    { type: 'page', config: RouteConfig[RouteNames.formExample], icon: CircleIcon },
];
