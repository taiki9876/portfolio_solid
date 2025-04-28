import { RouteConfigSettingType } from '@admin/routes/type';
import { NotFoundPage } from '@admin/pages/NotFoundPage';
import { ContractListPage } from '@admin/pages/SystemAdmin/ContractListPage';
import { HomePage } from '@admin/pages/SystemAdmin/HomePage';
import { ManagementNoticeListPage } from '@admin/pages/SystemAdmin/ManagementNoticeListPage';
import { ContractDetailPage } from '@admin/pages/SystemAdmin/ContractDetailPage';
import { ChangeSupportAccountPage } from '@admin/pages/SystemAdmin/ChangeSupportAccountPage';
import { ContractCreatePage } from '@admin/pages/SystemAdmin/ContractCreatePage';
import { ShopCreatePage } from '@admin/pages/SystemAdmin/ShopCreatePage';
import { ShopListPage } from '@admin/pages/SystemAdmin/ShopListPage';
import { ShopDetailPage } from '@admin/pages/SystemAdmin/ShopDetailPage';
import { ManagementNoticeDetailPage } from '@admin/pages/SystemAdmin/ManagementNoticeDetailPage';

/** [STEP1: システム管理者ルートを追加する際は最初にここに記載する ルートに名前をつける] */
export const SystemAdminRouteNames = {
    home: 'systemAdmin.home',
    contractList: 'systemAdmin.contractList',
    contractCreate: 'systemAdmin.contractCreate',
    contractDetail: 'systemAdmin.contractSDetail',
    shopList: 'systemAdmin.shopList',
    shopDetail: 'systemAdmin.shopDetail',
    shopCreate: 'systemAdmin.shopCreate',
    managementNoticeList: 'systemAdmin.managementNoticeList',
    managementNoticeDetail: 'systemAdmin.managementNoticeDetail',
    changeSupportAccount: 'systemAdmin.changeSupportAccount',
    notFound: 'systemAdmin.notFound',
} as const;
export type SystemAdminRouteNameType =
    (typeof SystemAdminRouteNames)[keyof typeof SystemAdminRouteNames];

/** [STEP2: 1で作成したRouteNameをキーとして設定を行う。エントリーポイントになるPageコンポーネントも作成すること] */
const ADMIN_PATH_BASE = '/admin';
export const SystemAdminRouteConfig: Record<SystemAdminRouteNameType, RouteConfigSettingType> = {
    [SystemAdminRouteNames.home]: {
        path: `${ADMIN_PATH_BASE}/`,
        displayName: 'トップ',
        page: HomePage,
    },
    [SystemAdminRouteNames.contractList]: {
        path: `${ADMIN_PATH_BASE}/system-admin/contracts`,
        displayName: '契約一覧',
        page: ContractListPage,
    },
    [SystemAdminRouteNames.contractCreate]: {
        path: `${ADMIN_PATH_BASE}/system-admin/contracts/create`,
        displayName: '契約追加',
        page: ContractCreatePage,
    },
    [SystemAdminRouteNames.contractDetail]: {
        path: `${ADMIN_PATH_BASE}/system-admin/contracts/:contractId`,
        displayName: '契約詳細',
        page: ContractDetailPage,
    },
    [SystemAdminRouteNames.shopList]: {
        path: `${ADMIN_PATH_BASE}/system-admin/contracts/:contractId/shops`,
        displayName: '店舗一覧',
        page: ShopListPage,
    },
    [SystemAdminRouteNames.shopDetail]: {
        path: `${ADMIN_PATH_BASE}/system-admin/contracts/:contractId/shops/:shopId`,
        displayName: '店舗詳細',
        page: ShopDetailPage,
    },
    [SystemAdminRouteNames.shopCreate]: {
        path: `${ADMIN_PATH_BASE}/system-admin/contracts/:contractId/shops/create`,
        displayName: '店舗追加',
        page: ShopCreatePage,
    },
    [SystemAdminRouteNames.managementNoticeList]: {
        path: `${ADMIN_PATH_BASE}/system-admin/notices`,
        displayName: '運営からのお知らせ',
        page: ManagementNoticeListPage,
    },
    [SystemAdminRouteNames.managementNoticeDetail]: {
        path: `${ADMIN_PATH_BASE}/system-admin/notices/:noticeId`,
        displayName: '運営からのお知らせ詳細',
        page: ManagementNoticeDetailPage,
    },
    [SystemAdminRouteNames.changeSupportAccount]: {
        path: `${ADMIN_PATH_BASE}/system-admin/change-support-account`,
        displayName: 'アカウント切り替え',
        page: ChangeSupportAccountPage,
    },
    [SystemAdminRouteNames.notFound]: {
        path: `${ADMIN_PATH_BASE}/*`,
        displayName: '',
        page: NotFoundPage,
    },
} as const;
/** [STEP3: 必要に応じてサイドバーに登録する ..../shared/components/Layout/SideNav/navDefinitionSystemAdmin.ts] */
