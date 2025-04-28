import { HomePage } from '@admin/pages/HomePage';
import { ManagementNoticePage } from '@admin/pages/ManagementNoticePage';
import { CustomersPage } from '@admin/pages/Customer/CustomersPage';
import { CustomersDetailPage } from '@admin/pages/Customer/CustomerDetailPage';
import { SettingPage } from '@admin/pages/SettingPage';
import { FormExample } from '@admin/pages/FormExample';
import { NotFoundPage } from '@admin/pages/NotFoundPage';
import { InquiryChatPage } from '@admin/pages/InquiryChat/InquiryChatPage';
import { InquiryAutoResponsePage } from '@admin/pages/InquiryChat/InquiryAutoResponsePage';
import { InquiryRichMenuPage } from '@admin/pages/InquiryChat/inquiryRichMenuPage';
import { SettingStorePage } from '@admin/pages/SettingStorePage';
import { SettingStaffPage } from '@admin/pages/SettingStaffPage';
import { SettingCategoryPage } from '@admin/pages/SettingCategoryPage';
import { RouteConfigSettingType } from '@admin/routes/type';

/** [STEP1: ルートを追加する際は最初にここに記載する ルートに名前をつける] */
export const RouteNames = {
    home: 'admin.home',
    customers: 'admin.customers',
    customerDetail: 'admin.customers.detail',
    inquiry: 'admin.inquiry',
    inquiryAutoResponse: 'admin.inquiry.auto-response',
    inquiryRichMenu: 'admin.inquiry.rich-menu',
    managementNotices: 'admin.managementNotices',
    setting: 'admin.setting.basic',
    settingStore: 'admin.setting.store',
    settingStaff: 'admin.setting.staff',
    settingCategory: 'admin.setting.category',
    formExample: 'admin.form-example',
    notFound: 'admin.notfound',
} as const;
export type RouteNameType = (typeof RouteNames)[keyof typeof RouteNames];

/** [STEP2: 1で作成したRouteNameをキーとして設定を行う。エントリーポイントになるPageコンポーネントも作成すること] */
const ADMIN_PATH_BASE = '/admin';
export const RouteConfig: Record<RouteNameType, RouteConfigSettingType> = {
    [RouteNames.home]: {
        path: `${ADMIN_PATH_BASE}/`,
        displayName: 'トップ',
        page: HomePage,
    },
    [RouteNames.customers]: {
        path: `${ADMIN_PATH_BASE}/customers`,
        displayName: '会員',
        page: CustomersPage,
    },
    [RouteNames.customerDetail]: {
        path: `${ADMIN_PATH_BASE}/customers/:customerCode`,
        displayName: '会員詳細',
        page: CustomersDetailPage,
    },
    [RouteNames.inquiry]: {
        path: `${ADMIN_PATH_BASE}/inquiry`,
        displayName: 'チャット',
        page: InquiryChatPage,
    },
    [RouteNames.inquiryAutoResponse]: {
        path: `${ADMIN_PATH_BASE}/inquiry/auto-response`,
        displayName: '自動応答設定',
        page: InquiryAutoResponsePage,
    },
    [RouteNames.inquiryRichMenu]: {
        path: `${ADMIN_PATH_BASE}/inquiry/rich-menu`,
        displayName: 'リッチメニュー設定',
        page: InquiryRichMenuPage,
    },
    [RouteNames.managementNotices]: {
        path: `${ADMIN_PATH_BASE}/management-notices`,
        displayName: '運営からのお知らせ',
        page: ManagementNoticePage,
    },
    [RouteNames.setting]: {
        path: `${ADMIN_PATH_BASE}/setting/basic`,
        displayName: '基本設定',
        page: SettingPage,
    },
    [RouteNames.settingStore]: {
        path: `${ADMIN_PATH_BASE}/setting/store`,
        displayName: '店舗設定',
        page: SettingStorePage,
    },
    [RouteNames.settingStaff]: {
        path: `${ADMIN_PATH_BASE}/setting/staff`,
        displayName: 'スタッフ設定',
        page: SettingStaffPage,
    },
    [RouteNames.settingCategory]: {
        path: `${ADMIN_PATH_BASE}/setting/category`,
        displayName: 'カテゴリー設定',
        page: SettingCategoryPage,
    },
    [RouteNames.formExample]: {
        path: `${ADMIN_PATH_BASE}/form-example`,
        displayName: 'フォーム', //TODO:いずれ削除
        page: FormExample,
    },
    [RouteNames.notFound]: {
        path: `${ADMIN_PATH_BASE}/*`,
        displayName: '',
        page: NotFoundPage,
    },
} as const;
/** [STEP3: 必要に応じてサイドバーに登録する ..../shared/components/Layout/SideNav/navDefinition.ts] */
