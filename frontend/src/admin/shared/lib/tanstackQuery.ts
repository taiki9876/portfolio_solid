import { QueryCache, QueryClient } from '@tanstack/react-query';
import { mSecondsFrom } from '@admin/shared/util/numberUtil';

// クエリキーを一元管理する
export const queryKeys = {
    fetchManagementNoticeOfHome: ['managementNoticeOfHome'],

    searchCustomer: (perPage: number, page: number, searchWord: string) => [
        'customers',
        perPage,
        page,
        searchWord,
    ],
    searchManagementNotices: (perPage: number, page: number, searchWord: string) => [
        'managementNotices',
        perPage,
        page,
        searchWord,
    ],
    searchChatrooms: (chatType: string, name: string, status: string) => [
        'chatrooms',
        chatType,
        name,
        status,
    ],
    fetchChatroomCustomer: (chatroomId: number) => ['chatroomCustomer', chatroomId],

    //システム管理者向け ----
    searchContracts: (searchWord: string) => ['contracts', searchWord],
    contractDetail: (contractId: number) => ['contractDetail', contractId],
    contractName: (contractId: number) => ['contractName', contractId],

    searchShops: (contractId: number, searchWord: string) => ['shops', contractId, searchWord],
    shopDetail: (contractId: number, shopId: number) => ['shopDetail', contractId, shopId],

    fetchManagementNotices: (searchWord: string) => ['managementNotices', searchWord],
    managementNoticesDetail: (noticeId: number) => ['managementNotices', noticeId],
};

// クエリクライアントのデフォルト・初期設定
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: mSecondsFrom(5, 'minute'),
        },
        mutations: {
            retry: 1,
        },
    },
    queryCache: new QueryCache({
        onSuccess: () => successHandler(),
        onError: (error) => errorHandler(error.message),
    }),
});

const successHandler = () => {
    console.log(`query success`);
};
const errorHandler = (message: string) => {
    console.error(`query error: ${message}`);
};
