import {
    dateDifference,
    formatDate,
    isFuture,
    isSameDate,
    isToday,
    isValidDate,
    now,
    splitDate,
    updateDate,
    updateTime,
} from '@admin/shared/util/dateUtil';
import { dayjs } from '@admin/shared/lib/dayjs.js';

test('test_now_現在時刻を取得できること', () => {
    //Given
    const fixedDate = new Date('2025-01-01T09:00:00Z');
    vi.setSystemTime(fixedDate);

    //When
    const result = now();

    //Then
    expect(result.toISOString()).toBe(dayjs(fixedDate).toISOString());
    vi.restoreAllMocks();
});

test.each([
    { target: '2025/01/08', option: {}, expected: '2025/01/08' },
    {
        target: new Date('2025/01/08 10:00:00'),
        option: { withTime: true },
        expected: '2025/01/08 10:00',
    },
    {
        target: '2025/01/08 10:00:00',
        option: { withTime: true },
        expected: '2025/01/08 10:00',
    },
    {
        target: '2025/01/08 10:00:00',
        option: { withTime: false },
        expected: '2025/01/08',
    },
    {
        target: '2025/01/08 10:00:00',
        option: { withWeekday: true },
        expected: '2025/01/08(水)',
    },
    {
        target: '2025/01/08 10:00:00',
        option: { withTime: true, withWeekday: true },
        expected: '2025/01/08(水) 10:00',
    },
])(
    'test_formatDate_アプリケーション仕様形式にフォーマットできること',
    ({ target, option, expected }) => {
        //Given

        //Then
        expect(formatDate(target, option)).toBe(expected);
    }
);

test.each([
    { description: '日数計算', unit: 'day', value: 1 },
    { description: '時間計算', unit: 'hour', value: 4 },
    { description: '分計算', unit: 'minute', value: 5 },
    { description: '秒計算', unit: 'second', value: 33 },
    { description: '年計算', unit: 'year', value: 10 },
])('test_dateDifference_日時の差を計算できること_$description', ({ unit, value }) => {
    //Given
    const date1 = now();
    const date2 = now().add(value, unit as dayjs.ManipulateType);

    //Then
    expect(value).toBe(dateDifference(date1, date2, unit as dayjs.ManipulateType));
    expect(-value).toBe(dateDifference(date2, date1, unit as dayjs.ManipulateType));
});

test.each([
    { description: '有効な形式1', dateStr: '2025-05-01', result: true },
    { description: '有効な形式2', dateStr: '2025/05/01', result: true },
    { description: '有効な形式3', dateStr: '2025-05-01 11:11:0', result: true },
    { description: '無効な形式1', dateStr: '2025年5月11日', result: false },
    { description: '無効な形式2', dateStr: '202223-44-55', result: false },
    { description: '無効な形式3', dateStr: 'ああいいうう', result: false },
])('test_isValidDate_日付形式が有効か判定できること_$description', ({ dateStr, result }) => {
    expect(isValidDate(dateStr)).toBe(result);
});

const fakeTime = '2025-01-01T09:10:00Z';
test.each([
    { description: '未来_日', dateStr: '2025-01-02T09:11:00Z', unit: 'day', result: true },
    { description: '未来_分', dateStr: '2025-01-01T09:11:00Z', unit: 'minute', result: true },
    { description: '未来_時間', dateStr: '2025-01-01T10:00:00Z', unit: 'hour', result: true },
    { description: '過去_日', dateStr: '2024-12-31T23:59:59Z', unit: 'day', result: false },
    { description: '過去_分', dateStr: '2025-01-01T09:09:00Z', unit: 'minute', result: false },
    { description: '過去_時間', dateStr: '2025-01-01T08:59:00Z', unit: 'hour', result: false },
    { description: '同じ_日', dateStr: '2025-01-01T02:11:00Z', unit: 'day', result: false },
    { description: '同じ_分', dateStr: '2025-01-01T09:10:33Z', unit: 'minute', result: false },
    { description: '同じ_時間', dateStr: '2025-01-01T09:11:00Z', unit: 'hour', result: false },
])('test_isFuture_未来の日付かを判定できること_$description', ({ dateStr, unit, result }) => {
    const fixedDate = new Date(fakeTime);
    vi.setSystemTime(fixedDate);

    expect(isFuture(dayjs(dateStr), unit as dayjs.ManipulateType)).toBe(result);
    vi.restoreAllMocks();
});

test('test_isToday_今日の日付かを判定できること', () => {
    //Given
    const fixedDate = new Date(fakeTime);
    vi.setSystemTime(fixedDate);

    //Then
    expect(isToday(dayjs(fixedDate))).toBe(true);
    expect(isToday(fixedDate)).toBe(true);
    vi.restoreAllMocks();
});

test('test_isSameDate_日付が同じかを判定できること', () => {
    //Given
    const date1 = '2025-01-01 11:00';
    const date2 = '2025-01-01';

    //Then
    expect(isSameDate(date1, date2)).toBe(true);
});

test.each([
    {
        target: '2025-01-01 11:42:15',
        expected: { year: 2025, month: 1, day: 1, hour: 11, minute: 42, second: 15 },
    },
    {
        target: '2025-12-31 23:59:59',
        expected: { year: 2025, month: 12, day: 31, hour: 23, minute: 59, second: 59 },
    },
    {
        target: '2025-01-01 00:00:00',
        expected: { year: 2025, month: 1, day: 1, hour: 0, minute: 0, second: 0 },
    },
    {
        target: '2025-01-01 00:00:00',
        expected: { year: 2025, month: 1, day: 1, hour: 0, minute: 0, second: 0 },
    },
    {
        target: dayjs('2025-01-01 00:00:00'),
        expected: { year: 2025, month: 1, day: 1, hour: 0, minute: 0, second: 0 },
    },
    {
        target: new Date('2025-01-01 00:00:00'),
        expected: { year: 2025, month: 1, day: 1, hour: 0, minute: 0, second: 0 },
    },
])('test_splitDate_日付を分解して取得できること', ({ target, expected }) => {
    expect(splitDate(target)).toEqual(expected);
});

test('test_updateDate_日付を更新できること', () => {
    //Given
    const baseDate = '2025-01-01 10:00:00';
    const newDate = '2025-01-03 12:00:00';

    //When
    const result = updateDate(baseDate, newDate);

    //Then: 日付が更新されていること (時間は置き換わらないこと)
    expect(result.format('YYYY-MM-DD HH:mm:ss')).toBe('2025-01-03 10:00:00');
});

const baseDate = '2025-01-11 10:11:00';
test.each([
    { hour: undefined, minute: undefined, expected: '2025-01-11 10:11:00' },
    { hour: '12', minute: '00', expected: '2025-01-11 12:00:00' },
    { hour: '15', minute: undefined, expected: '2025-01-11 15:11:00' },
    { hour: undefined, minute: '55', expected: '2025-01-11 10:55:00' },
])('test_updateTime_時間のみを更新できること', ({ hour, minute, expected }) => {
    //When
    const result = updateTime(baseDate, hour, minute);

    //Then: 時間のみが更新されていること (日付は置き換わらないこと)
    expect(result.format('YYYY-MM-DD HH:mm:ss')).toBe(expected);
});
