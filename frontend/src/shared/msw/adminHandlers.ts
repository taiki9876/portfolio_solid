import { http, HttpResponse } from 'msw';
import { authAPiPath } from '@admin/shared/api/context/auth';
import { AdminRoles } from '@admin/domain/admin/model';
import { customerApiPath } from '@admin/shared/api/context/customers';
import { dummyCustomersResponse, dummyPageMetaResponse } from '@src/shared/msw/mocks/customers';
import { chatAPiPath } from '@admin/shared/api/context/chat';
import { dummyChatroomCustomerResponse, dummyChatroomsResponse } from '@src/shared/msw/mocks/chat';

// テスト実行時のAPI処理のデフォルトのハンドラーを定義
export const adminHandlers = [
    http.get(authAPiPath.fetchProfile, () => {
        return HttpResponse.json({ role: AdminRoles.supportAdmin });
    }),
    http.post(authAPiPath.logout, () => new HttpResponse(undefined, { status: 204 })),

    http.get(customerApiPath.fetchCustomers, () => {
        return HttpResponse.json({
            data: dummyCustomersResponse,
            meta: dummyPageMetaResponse,
        });
    }),

    http.get(chatAPiPath.fetchChatrooms, () => {
        return HttpResponse.json({
            data: dummyChatroomsResponse,
            hasMore: false,
        });
    }),
    http.get(chatAPiPath.fetchChatroomCustomer(1), () => {
        return HttpResponse.json(dummyChatroomCustomerResponse);
    }),
];
