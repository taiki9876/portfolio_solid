import { Validation } from '@admin/shared/lib/reactHookForm/validation';

export type FormValues = {
    lastName: string;
    firstName: string;
    lastNameKana: string;
    firstNameKana: string;
    memberNumber: string;
    parentMemberNumber: string;
    birthDate: string;
    gender: string;
    email: string;
    isEmailGuidance: boolean;
    phoneNumber: string;
    customerCode: string;
    postalCode: string;
    address: string;
};

export const defaultValues = {
    lastName: '',
    firstName: '',
    lastNameKana: '',
    firstNameKana: '',
    memberNumber: '',
    parentMemberNumber: '',
    birthDate: undefined,
    gender: 'unknown',
    email: '',
    isEmailGuidance: false,
    phoneNumber: '',
    customerCode: '',
    postalCode: '',
    address: '',
};

// ------------ validate rules -------------
export const nameRule = (kana: boolean = false) => {
    if (kana === true) {
        return {
            required: Validation.required(),
            maxLength: Validation.maxLength(85),
            pattern: Validation.pattern.fullWidthKatakana(),
        };
    }
    return {
        required: Validation.required(),
        maxLength: Validation.maxLength(85),
    };
};

export const memberNumberRule = () => {
    return {
        maxLength: Validation.maxLength(20),
        pattern: Validation.pattern.halfWidth(),
    };
};

export const birthDateRule = () => {
    return {
        pattern: Validation.pattern.date(),
    };
};

export const genderRule = () => {
    return {
        required: Validation.required(),
        validate: (value: string) => {
            if (value === 'male' || value === 'female' || value === 'unknown') {
                return true;
            }

            return '性別を選択してください。';
        },
    };
};

export const emailRule = () => {
    return {
        maxLength: Validation.maxLength(255),
        pattern: Validation.pattern.email(),
    };
};

export const phoneNumberRule = () => {
    return {
        pattern: Validation.pattern.phone(),
    };
};

export const postalCodeRule = () => {
    return {
        pattern: Validation.pattern.postalCode(),
    };
};

export const addressRule = () => {
    return {
        maxLength: Validation.maxLength(255),
    };
};
