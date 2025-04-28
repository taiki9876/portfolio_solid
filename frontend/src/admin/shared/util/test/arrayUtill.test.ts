import { isLastIndex, range } from '@admin/shared/util/arrayUtil';

test('test_isLastIndex_最後の添字であるかを判定すること', () => {
    const dummyArray = [1, 5, 3, 8, 5];

    expect(isLastIndex(dummyArray, 0)).toBe(false);
    expect(isLastIndex(dummyArray, 1)).toBe(false);
    expect(isLastIndex(dummyArray, 2)).toBe(false);
    expect(isLastIndex(dummyArray, 3)).toBe(false);
    expect(isLastIndex(dummyArray, 4)).toBe(true);
});

test('test_range_指定した範囲の数値の配列を生成すること', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(range(3, 5)).toEqual([3, 4, 5]);
    expect(range(1, 1)).toEqual([1]);
    expect(() => range(5, 1)).toThrowError('start は end より小さい値である必要があります');
});
