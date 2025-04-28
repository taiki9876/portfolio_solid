import { isValidDate } from '@admin/shared/util/dateUtil';
import { Customer } from './model.ts';

// API取得データの変換用メソッド;
export type CustomerApiResource = {
    customerCode: string;
    customerNumber: string | null;
    name: string;
    birthDate: string | null;
    sex: string;
    rank: string;
    parentCustomer: string | null;
    install: boolean;
    entryAt: string;
    lastLoginAt: string | null;
    lastVisitAt: string | null;
    point: number;
};
export const convertToCustomer = (resource: CustomerApiResource): Customer => {
    if (resource.birthDate !== null && !isValidDate(resource.birthDate)) {
        throw new Error('生年月日が不正です。');
    }
    if (resource.lastLoginAt !== null && !isValidDate(resource.lastLoginAt)) {
        throw new Error('最終ログイン日時が不正です。');
    }

    if (resource.lastVisitAt !== null && !isValidDate(resource.lastVisitAt)) {
        throw new Error('最終来店日時が不正です。');
    }

    return {
        customerCode: resource.customerCode,
        customerNumber: resource.customerNumber,
        name: resource.name,
        birthDate: resource.birthDate,
        sex: resource.sex,
        rank: resource.rank,
        parentCustomerCode: resource.parentCustomer,
        isInstall: resource.install,
        entryAt: resource.entryAt,
        lastLoginAt: resource.lastLoginAt,
        lastVisitAt: resource.lastVisitAt,
        point: resource.point,
    };
};
