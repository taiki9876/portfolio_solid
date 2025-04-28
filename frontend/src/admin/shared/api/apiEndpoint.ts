import { chatApi } from './context/chat';
import { customersApi } from './context/customers';
import { authAPi } from './context/auth.ts';
import { systemAdminApi } from './context/systemAdminApi';
import { managementNoticesApi } from './context/managementNoticesApi';
import { homeAPi } from './context/home';

export const ApiEndpoint = {
    auth: authAPi,
    home: homeAPi,
    systemAdmin: systemAdminApi,
    customers: customersApi,
    chat: chatApi,
    managementNotices: managementNoticesApi,
    // etc...
} as const;
