import {
    isValidationErrorCode,
    isServerValidationError,
    RedirectPath,
    redirectTo,
    responseOk,
} from '@admin/shared/util/networkUtil';
import { AxiosError } from 'axios';

test('test_responseOk_正常なステータスコードであるか判定できること', () => {
    expect(responseOk(200)).toBe(true);
    expect(responseOk(201)).toBe(true);
    expect(responseOk(204)).toBe(true);

    expect(responseOk(404)).toBe(false);
    expect(responseOk(403)).toBe(false);
    expect(responseOk(500)).toBe(false);
});

test('test_isValidationErrorCode_ステータスコードがバリデーションエラーであるかを判定すること', () => {
    expect(isValidationErrorCode(200)).toBe(false);
    expect(isValidationErrorCode(500)).toBe(false);
    expect(isValidationErrorCode(402)).toBe(false);
});
test.each([
    { code: 200, expected: false },
    { code: 500, expected: false },
    { code: 402, expected: false },
    { code: 422, expected: true },
])(
    'test_isValidationErrorCode_ステータスコードがバリデーションエラーであるかを判定すること',
    ({ code, expected }) => {
        const validationError = new AxiosError(
            'Validation Error',
            undefined,
            undefined,
            undefined,
            {
                status: code,
                data: { errors: [] },
                headers: {},
                config: {},
            } as never
        );

        expect(isValidationErrorCode(validationError)).toBe(expected);
    }
);

test('test_isServerValidationError_値がバリデーションエラー形式のオブジェクトであるか判定すること', () => {
    expect(isServerValidationError(1)).toBe(false);
    expect(isServerValidationError({ name: 'test' })).toBe(false);
    expect(isServerValidationError('1')).toBe(false);
    expect(
        isServerValidationError({
            message: 'test',
            errors: ['test'],
        })
    ).toBe(false);
    expect(
        isServerValidationError({
            message: 'test',
            errors: {
                name: ['test'],
                key: ['aaa'],
                other: { 0: 'test', 1: 'test' },
                hoge: { fuga: 'test', 1: 'test', 2: 'test' },
            },
        })
    ).toBe(true);
});

describe('test_redirectTo_リダイレクトされること', () => {
    const tmpLocation = window.location;

    beforeAll(() => {
        Object.defineProperty(window, 'location', {
            writable: true,
            value: { href: '' },
        });
    });
    afterAll(() => {
        window.location = tmpLocation;
    });

    test('test_redirectTo_リダイレクトされること', () => {
        const hrefSpy = vi.spyOn(window.location, 'href', 'set');
        redirectTo(RedirectPath.forbidden);

        expect(hrefSpy).toHaveBeenCalledWith(RedirectPath.forbidden);

        hrefSpy.mockRestore();
    });
});
