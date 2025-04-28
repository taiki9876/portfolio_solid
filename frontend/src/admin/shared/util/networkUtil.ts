import { AxiosError, isAxiosError } from 'axios';
import { snakeToCamel } from '@admin/shared/util/objectUtil';

export const responseOk = (statusCode: string | number) => {
    const code = typeof statusCode === 'number' ? statusCode : parseInt(statusCode);

    return code >= 200 && code < 300;
};

//---- Validation系
// NOTE: Laravelではバリデーションエラー時に422コードを返す
export const isValidationErrorCode = (error: unknown): error is ValidationErrorResponse => {
    return (
        isAxiosError<ValidationErrors>(error) &&
        error.response !== undefined &&
        error.response.status === 422
    );
};

export const isServerValidationError = (obj: unknown): obj is ValidationErrors => {
    if (typeof obj !== 'object' || obj === null) return false;

    const validationObj = obj as Partial<ValidationErrors>;

    if (typeof validationObj.message !== 'string') return false;
    if (typeof validationObj.errors !== 'object' || validationObj.errors === null) return false;

    return Object.values(validationObj.errors).every(
        (value) =>
            Array.isArray(value) ||
            (typeof value === 'object' &&
                value !== null &&
                Object.values(value).every((v) => typeof v === 'string')) // {0: string, 1: string} の場合
    );
};

export const makeServerValidationError = (error: ValidationErrorResponse) => {
    return {
        message: error.response.data.message,
        errors: snakeToCamel(error.response.data.errors),
    };
};
type ValidationErrorResponse = AxiosError<ValidationErrors> & {
    response: { data: ValidationErrors };
};
export type ValidationErrors = {
    message: string;
    errors: {
        [key: string]: string[]; // フィールド名ごとにエラーメッセージの配列
    };
};

// redirect
export const RedirectPath = {
    notFound: '/admin/404',
    forbidden: '/admin/403',
    serverError: '/admin/500',
    loginPage: '/admin/login',
    HomePage: '/admin',
    SystemAdminContractsPage: '/admin/system-admin/contracts',
} as const;
type RedirectPathType = (typeof RedirectPath)[keyof typeof RedirectPath];
export const redirectTo = (path: RedirectPathType) => {
    window.location.href = `${path}`;
};
