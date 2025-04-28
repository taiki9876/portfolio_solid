//バリデーションのルールと対応する汎用的なエラーメッセージを定義
import { IMAGE_MAX_SIZE } from '@src/config';

export const Validation = {
    required: () => '必須入力です。',
    maxLength: (length: number, message = `${length}文字までです。`) => ({
        value: length,
        message: message,
    }),
    minLength: (length: number, message = `${length}文字以上で入力してください。`) => ({
        value: length,
        message,
    }),
    max: (value: number | string, message = `${value}以下で入力してください。`) => ({
        value,
        message,
    }),
    min: (value: number | string, message = `${value}以上で入力してください。`) => ({
        value,
        message,
    }),
    validate: {
        in: (
            target: number | string,
            validValues: (number | string)[],
            message = `指定した値は入力できません。`
        ) => {
            return validValues.includes(target) || message;
        },
        isBoolean: (value: unknown, message = 'true または false を指定してください。') => {
            if (typeof value === 'boolean') return true;
            if (typeof value === 'string' && (value === 'true' || value === 'false')) return true;
            return message;
        },
        lessThan10MB: (file?: File) => {
            return (
                file === undefined ||
                file.size <= IMAGE_MAX_SIZE ||
                '10MB以下の画像を選んでください'
            );
        },
        imageFile: (file?: File) => {
            const acceptedTypes = ['image/jpeg', 'image/png'];
            return (
                file == undefined ||
                acceptedTypes.includes(file.type) ||
                'jpeg, png形式の画像を選んでください'
            );
        },
    },
    pattern: {
        halfWidth: (message = '半角文字のみで入力してください。') => ({
            value: /^[\x20-\x7E]+$/,
            message,
        }),
        email: (message = '正しいメールアドレス形式で入力してください。') => ({
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message,
        }),
        phone: (message = '正しい電話番号形式で入力してください。') => ({
            value: /^(\d{2,4}-?\d{2,4}-?\d{3,4})$/,
            message,
        }),
        numeric: (message = '数字のみで入力してください。') => ({
            value: /^\d+$/,
            message,
        }),
        alphanumeric: (message = '半角英数字のみで入力してください。') => ({
            value: /^[a-zA-Z0-9]+$/,
            message,
        }),
        userId: (message = '半角英数字、ハイフン、アンダースコアのみで入力してください。') => ({
            value: /^[a-zA-Z0-9-_]+$/,
            message,
        }),
        postalCode: (message = '正しい郵便番号形式で入力してください。') => ({
            value: /^\d{3}-?\d{4}$/,
            message,
        }),
        fullWidthKatakana: (message = '全角カタカナで入力してください。') => ({
            value: /^[ァ-ヶー]+$/,
            message,
        }),
        date: (message = '正しい日付形式で入力してください。') => ({
            value: /^\d{4}[-/]\d{2}[-/]\d{2}(?: \d{2}:\d{2}(?::\d{2})?)?$/,
            message,
        }),
        password: (message = '8〜20文字の英字を含めてください。') => ({
            value: /^(?=.*[A-Za-z])[A-Za-z\d!@#$%^&*()_+{}[\]:;<>,.?/~\\-]{8,20}$/,
            message,
        }),
        url: (message = '正しいURL形式で入力してください。') => ({
            value: /^(https?):\/\/([a-zA-Z0-9.-]+)(:[0-9]+)?(\/[^\s]*)?$/,
            message,
        }),
    },
};
