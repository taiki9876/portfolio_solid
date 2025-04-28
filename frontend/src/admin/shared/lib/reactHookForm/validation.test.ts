import { Validation } from './validation';

describe('test_Validation_patternが正しい動作をすること', () => {
    test('test_halfWidth_半角文字のみであるか判定できること', () => {
        const { value: regex } = Validation.pattern.halfWidth();
        expect('abc123').toMatch(regex);
        expect('ＡＢＣ１２３abc123').not.toMatch(regex); //Then: 全角はNG
    });

    test('test_email形式か判定できること', () => {
        const { value: regex } = Validation.pattern.email();
        expect('test@example.com').toMatch(regex);
        expect('invalid-email').not.toMatch(regex);
        expect('@test.com').not.toMatch(regex);
    });

    test('test_phone_電話番号形式か判定できること', () => {
        const { value: regex } = Validation.pattern.phone();
        expect('03-1234-5678').toMatch(regex);
        expect('0312345678').toMatch(regex);

        expect('12345').not.toMatch(regex);
        expect('12345あ').not.toMatch(regex);
        expect('12345a').not.toMatch(regex);
    });

    test('test_numeric_数字のみではるか判定できること', () => {
        const { value: regex } = Validation.pattern.numeric();
        expect('123456').toMatch(regex);
        expect('123abc').not.toMatch(regex); // 文字が混ざっている場合NG
    });

    test('test_postalCode_郵便番号形式であるか判定できること', () => {
        const { value: regex } = Validation.pattern.postalCode();
        expect('123-4567').toMatch(regex);
        expect('1234567').toMatch(regex);

        expect('1234-567').not.toMatch(regex);
    });

    test('test_fullWidthKatakana_全角カタカナであるか判定できること', () => {
        const { value: regex } = Validation.pattern.fullWidthKatakana();
        expect('カタカナ').toMatch(regex);
        expect('ｶﾀｶﾅ').not.toMatch(regex); // 半角カタカナはNG
        expect('ひらがな').not.toMatch(regex); // ひらがなはNG
    });

    test('test_date_日付形式であるか判定できること', () => {
        const { value: regex } = Validation.pattern.date();
        expect('2025-01-18').toMatch(regex);
        expect('2025-01-18 12:30').toMatch(regex); // 時間、分付きもOK
        expect('2025-01-18 12:30:11').toMatch(regex); // 秒までつけてもOK

        expect('2025-1-8').not.toMatch(regex); // 不正な形式
        expect('18-01-2025').not.toMatch(regex); // 不正な形式
    });
});
