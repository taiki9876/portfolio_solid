import { expect } from 'vitest';
import { camelToSnake, isDeepEqual, snakeToCamel } from '@admin/shared/util/objectUtil';

test('test_isDeepEqual_オブジェクトが等しいかを判定できること', () => {
    expect(isDeepEqual({ name: 'hoge' }, { name: 'hoge' })).toBe(true);
    expect(isDeepEqual({ name: 'hoge' }, { name: 'fuga' })).toBe(false);

    //オブジェクトのキーの順番が違っても値が同じならtrue
    expect(isDeepEqual({ name: 'hoge', age: 20 }, { age: 20, name: 'hoge' })).toBe(true);
    expect(isDeepEqual({ name: 'hoge', age: 20 }, { age: 29, name: 'hoge' })).toBe(false);

    //ネストした値も比較できる
    expect(
        isDeepEqual(
            { name: 'hoge', age: 20, address: { city: 'Tokyo', town: 'Shibuya' } },
            { name: 'hoge', age: 20, address: { city: 'Tokyo', town: 'Shibuya' } }
        )
    ).toBe(true);
    expect(
        isDeepEqual(
            { name: 'hoge', age: 20, address: { city: 'Tokyo', town: 'Shibuya' } },
            { name: 'hoge', age: 20, address: { city: 'Tokyo', town: 'Shinjyuku' } }
        )
    ).toBe(false);
});

test('test_camelToSnake_キャメルケースのキーをスネークケースのキーオブジェクトに変換すること', () => {
    const target1 = { testName: 'hoge', testAge: 98 };
    expect(camelToSnake(target1)).toEqual({ test_name: 'hoge', test_age: 98 });
});
test('test_snakeToCamel_スネークケースキーのオブジェクトをキャメルケースオブジェクトに変換すること', () => {
    const target1 = { test_name: 'hoge', test_age: 98 };
    expect(snakeToCamel(target1)).toEqual({ testName: 'hoge', testAge: 98 });
});
