import { Validation } from '@admin/shared/lib/reactHookForm/validation';
import { ContractApp } from '@admin/domain/contract/model';

export type ManagementNoticeFormValues = {
    title: string;
    content: string;
    publishedAt: string | undefined;
    unpublishedAt: string | undefined;
    isPublished: boolean;
    showPopup: boolean;
    contractAppType: string;
};

export const defaultValues: ManagementNoticeFormValues = {
    title: '',
    content: '',
    publishedAt: undefined,
    unpublishedAt: undefined,
    isPublished: true,
    showPopup: false,
    contractAppType: '',
};

// ------------ validate rules -------------
export const rules = {
    title: {
        required: Validation.required(),
        maxLength: Validation.maxLength(200),
    },
    content: {
        required: Validation.required(),
        maxLength: Validation.maxLength(2000),
    },
    publishedAt: {
        required: Validation.required(),
        pattern: Validation.pattern.date(),
    },
    unpublishedAt: {
        pattern: Validation.pattern.date(),
    },
    isPublished: {
        validate: (value: unknown) => Validation.validate.isBoolean(value),
    },
    showPopup: {
        validate: (value: unknown) => Validation.validate.isBoolean(value),
    },
    contractAppType: {
        validate: (value: unknown) => {
            return Validation.validate.in(value as string, [
                '', //nullable
                String(ContractApp.lineApp),
                String(ContractApp.nativeApp),
            ]);
        },
    },
};
