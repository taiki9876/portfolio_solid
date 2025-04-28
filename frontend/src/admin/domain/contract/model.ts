export type Contract = {
    id: number;
    accountName: string;
    contractKey: string;
    customerCount: string;
    shopCount: number;
    personInCharge: string;
    tel: string;
    industry: string;
    contractStatus: number;
    contractAppType: number;
};

// 契約ステータス --------------------------------------------------
export const ContractStatus = {
    active: 1,
    inactive: 0,
} as const;
export type ContractStatusType = (typeof ContractStatus)[keyof typeof ContractStatus];
export const toContractStatusString = (status: ContractStatusType): string => {
    return status === ContractStatus.active ? '有効' : '無効';
};

// 契約アプリタイプ --------------------------------------------------
export const ContractApp = {
    lineApp: 1,
    nativeApp: 2,
} as const;
export type ContractAppType = (typeof ContractApp)[keyof typeof ContractApp];
export const toContractAppString = (intValue: ContractAppType): string => {
    const contractAppMap: Record<ContractAppType, string> = {
        [ContractApp.lineApp]: 'LINEミニアプリ',
        [ContractApp.nativeApp]: 'ネイティブアプリ',
    };

    return contractAppMap[intValue] ?? '';
};

// 契約ステータス --------------------------------------------------
export type ContractSummary = {
    name: string;
    key: string;
    keyAlias: string;
    industry: string | undefined;
    personInCharge: string | undefined;
    tel: string | undefined;
    email: string | undefined;
    memo: string | undefined;
    contractStatus: number;
    contractAppType: number;
    customerCount: number;
    shopCount: number;
};
export type OwnerAdmin = {
    adminLoginId: string;
    password: string;
};
