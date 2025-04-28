import { Contract, ContractSummary, OwnerAdmin } from './model.ts';

// API取得データの変換用メソッド;
export type ContractApiResource = Contract;
export const convertToContract = (resource: ContractApiResource): Contract => {
    return {
        id: resource.id,
        accountName: resource.accountName,
        contractKey: resource.contractKey,
        customerCount: resource.customerCount,
        shopCount: resource.shopCount,
        personInCharge: resource.personInCharge,
        tel: resource.tel,
        industry: resource.industry,
        contractStatus: resource.contractStatus,
        contractAppType: resource.contractAppType,
    };
};

// -- 詳細ページのサマリー情報 backend@FetchContractOutput
export type ContractSummaryApiResource = {
    name: string;
    key: string;
    keyAlias: string;
    industry: string | null;
    personInCharge: string | null;
    tel: string | null;
    email: string | null;
    memo: string | null;
    contractStatus: number;
    contractAppType: number;
    customerCount: number;
    shopCount: number;
};
export const convertToContractSummary = (resource: ContractSummaryApiResource): ContractSummary => {
    return {
        name: resource.name,
        key: resource.key,
        keyAlias: resource.keyAlias,
        industry: resource.industry ?? undefined,
        personInCharge: resource.personInCharge ?? undefined,
        tel: resource.tel ?? undefined,
        email: resource.email ?? undefined,
        memo: resource.memo ?? undefined,
        contractStatus: resource.contractStatus,
        contractAppType: resource.contractAppType,
        customerCount: resource.customerCount,
        shopCount: resource.shopCount,
    };
};
export type OwnerAdminApiResource = {
    adminLoginId: string;
    password: string;
};
export const convertToOwnerAdmin = (resource: OwnerAdminApiResource): OwnerAdmin => {
    return {
        adminLoginId: resource.adminLoginId,
        password: resource.password,
    };
};
