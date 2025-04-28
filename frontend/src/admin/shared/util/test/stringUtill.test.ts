import { expect } from 'vitest';
import { truncateString } from '@admin/shared/util/stringUtil';

test('test_truncateString_文字列切り取りできること', () => {
    expect(truncateString('こんにちは', 100)).toBe('こんにちは');
    expect(truncateString('こんにちは', 1)).toBe('こ');
    expect(truncateString('こんにちは', 5)).toBe('こんにちは');

    expect(truncateString('こんにちは', 2, true)).toBe('こん...');
});
