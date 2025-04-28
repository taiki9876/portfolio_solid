import { expect } from 'vitest';
import {
    addThousandSeparators,
    formatSignedNumber,
    mSecondsFrom,
    zeroPadding,
} from '@admin/shared/util/numberUtil';

test('test_zeroPadding_数値を桁埋めできること', () => {
    //Given
    const target = 123;

    //When
    expect(zeroPadding(target, 5)).toBe('00123');
});

test('test_mSecondsFrom_指定した時間のミリ秒を取得できること', () => {
    //Given
    const value = 1;

    //When
    expect(mSecondsFrom(value, 'day')).toBe(86400000);
    expect(mSecondsFrom(value, 'hour')).toBe(3600000);
    expect(mSecondsFrom(value, 'minute')).toBe(60000);
    expect(mSecondsFrom(value, 'second')).toBe(1000);
});

test('test_formatSignedNumber_正負の記号付き文字列を返すこと', () => {
    expect(formatSignedNumber(20)).toBe('+20');
    expect(formatSignedNumber(-66)).toBe('-66');
    expect(formatSignedNumber(0)).toBe('0');
});

test('test_addThousandSeparators_3桁ごとにカンマをつけること', () => {
    expect(addThousandSeparators(20)).toBe('20');
    expect(addThousandSeparators(100)).toBe('100');
    expect(addThousandSeparators(1000)).toBe('1,000');
    expect(addThousandSeparators(1000000)).toBe('1,000,000');
    expect(addThousandSeparators(0)).toBe('0');
});
