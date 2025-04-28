export type Customer = {
    customerCode: string;
    customerNumber: string | null;
    name: string;
    birthDate: string | null;
    sex: string;
    rank: string;
    parentCustomerCode: string | null;
    isInstall: boolean;
    entryAt: string;
    lastLoginAt: string | null;
    lastVisitAt: string | null;
    point: number;
};
