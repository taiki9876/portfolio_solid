import { CustomerApiResource } from '@admin/domain/customer/transform';
import { PageMetaApiResource } from '@admin/domain/pagination/transform';
import { range } from '@admin/shared/util/arrayUtil';

export const dummyCustomersResponse: CustomerApiResource[] = [
    {
        customerCode: 'A123456',
        customerNumber: '123456',
        name: '山田太郎',
        birthDate: null,
        sex: '男性',
        rank: '一般',
        parentCustomer: null,
        install: false,
        entryAt: '2021-01-01',
        lastLoginAt: null,
        lastVisitAt: null,
        point: 100,
    },
    {
        customerCode: 'B123456',
        customerNumber: '987987',
        name: '田中花子',
        birthDate: null,
        sex: '女性',
        rank: '一般',
        parentCustomer: null,
        install: false,
        entryAt: '2022-01-01',
        lastLoginAt: null,
        lastVisitAt: null,
        point: 200,
    },
    ...range(1, 30).map((num) => ({
        customerCode: `C123456${num}`,
        customerNumber: '654987321',
        name: `JohnDoe${num}`,
        birthDate: null,
        sex: '不明',
        rank: '一般',
        parentCustomer: null,
        install: false,
        entryAt: '2022-01-01',
        lastLoginAt: null,
        lastVisitAt: null,
        point: 200,
    })),
];

export const dummyPageMetaResponse: PageMetaApiResource = {
    page: 1,
    perPage: 20, //テスト時のみ1に変更
    total: dummyCustomersResponse.length,
    lastPage: 2,
};
