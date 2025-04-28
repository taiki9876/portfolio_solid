import { Validation } from '@admin/shared/lib/reactHookForm/validation';
import { ContractApp, ContractStatus } from '@admin/domain/contract/model';

export type ContractFormValues = {
    contractName: string;
    contractKey: string;
    contractKeyAlias: string;
    contractAppType: string;
    industry: string;

    personInCharge: string;
    email: string;
    tel: string;
    memo: string;
};
export type OwnerAdminFormValues = {
    adminLoginId: string;
    adminPassword: string;
};

export type ContractCreateFormValues = ContractFormValues & OwnerAdminFormValues;

export type ContractEditFormValues = ContractFormValues & {
    contractStatus: string;
};

export const defaultValues = {
    contractName: '',
    contractKey: '',
    contractKeyAlias: '',
    contractAppType: '',
    industry: '',

    personInCharge: '',
    email: '',
    tel: '',
    memo: '',

    adminLoginId: '',
    adminPassword: '',
};
export const editDefaultValues = { ...defaultValues, contractStatus: ContractStatus.active };

// ------------ validate rules -------------
export const rules = {
    contractName: {
        required: Validation.required(),
        maxLength: Validation.maxLength(80),
    },
    contractKey: {
        required: Validation.required(),
        maxLength: Validation.maxLength(50),
    },
    contractKeyAlias: {
        required: Validation.required(),
        maxLength: Validation.maxLength(5),
    },
    industry: {
        maxLength: Validation.maxLength(50),
    },
    personInCharge: {
        maxLength: Validation.maxLength(100),
    },
    tel: {
        pattern: Validation.pattern.phone(),
    },
    email: {
        maxLength: Validation.maxLength(255),
        pattern: Validation.pattern.email(),
    },
    memo: {
        maxLength: Validation.maxLength(2500),
    },
    adminLoginId: {
        required: Validation.required(),
        pattern: Validation.pattern.userId(),
        maxLength: Validation.maxLength(100),
        minLength: Validation.minLength(6),
    },
    adminPassword: {
        required: Validation.required(),
        pattern: Validation.pattern.password(),
    },
    contractStatus: {
        validate: (status: unknown) => {
            return Validation.validate.in(status as string, [
                String(ContractStatus.active),
                String(ContractStatus.inactive),
            ]);
        },
    },
    contractAppType: {
        validate: (value: unknown) => {
            return Validation.validate.in(value as string, [
                String(ContractApp.lineApp),
                String(ContractApp.nativeApp),
            ]);
        },
    },
};
