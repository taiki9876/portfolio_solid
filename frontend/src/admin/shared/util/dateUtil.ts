import { dayjs } from '../lib/dayjs.js';

export const now = () => dayjs();

//アプリケーションの仕様に沿った表示形式にフォーマットする
const japaneseWeekdays = ['日', '月', '火', '水', '木', '金', '土'];
export const formatDate = (
    target: string | dayjs.Dayjs | Date,
    options: { withTime?: boolean; withWeekday?: boolean; withYear?: boolean } = {}
) => {
    const setting = { withTime: false, withWeekday: false, withYear: true, ...options };

    const targetDayjs = dayjs(target);
    const weekday = setting.withWeekday === true ? `(${japaneseWeekdays[targetDayjs.day()]})` : '';

    const formatStr = setting.withYear === true ? 'YYYY/MM/DD' : 'MM/DD';
    return setting.withTime === true
        ? `${targetDayjs.format(formatStr)}${weekday} ${targetDayjs.format('HH:mm')}` // 日付 + 曜日 + 時刻
        : `${targetDayjs.format(formatStr)}${weekday}`; // 日付 + 曜日（オプション）
};

/**
 * 2つの日時の差を計算
 * @returns 差分（指定した単位で返される数値）
 */
export const dateDifference = (
    date1: dayjs.Dayjs,
    date2: dayjs.Dayjs = dayjs(),
    unit: dayjs.OpUnitType = 'day'
): number => {
    return date2.diff(date1, unit);
};

//有効な日付形式か判定する
export const isValidDate = (dateStr: string): boolean => {
    return dayjs(dateStr).isValid();
};

//日付が現在時刻を基準に未来であるか？を判定する
export const isFuture = (
    date: dayjs.Dayjs | Date | string,
    unit: dayjs.ManipulateType = 'day'
): boolean => {
    return dayjs(date).isAfter(now(), unit);
};

//今日の日付か？を判定する
export const isToday = (target: dayjs.Dayjs | Date): boolean => {
    return dayjs(target).isSame(now(), 'day');
};

// 今年か？を判定する
export const isThisYear = (target: dayjs.Dayjs | Date): boolean => {
    return dayjs(target).isSame(now(), 'year');
};

//日付が同じか？を判定する
export const isSameDate = (
    date1: dayjs.Dayjs | string | Date,
    date2: dayjs.Dayjs | string | Date
): boolean => {
    const target1 = dayjs(date1);
    const target2 = dayjs(date2);
    return target1.isSame(target2, 'day');
};

//日付から、「年」「月」「日」「時間」「分」「秒」を分けて取得する
type DateParts = {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
};
export const splitDate = (input: dayjs.Dayjs | string | Date): DateParts => {
    const date = dayjs.isDayjs(input) ? input : dayjs(input);

    return {
        year: date.year(), // 年
        month: date.month() + 1, // 月（dayjsでは0始まりなので+1）
        day: date.date(), // 日
        hour: date.hour(), // 時
        minute: date.minute(), // 分
        second: date.second(), // 秒
    };
};

// 新しい日付（年、月、日）を上書き
export const updateDate = (
    baseDate: dayjs.Dayjs | string,
    newDate: dayjs.Dayjs | string
): dayjs.Dayjs => {
    const base = dayjs.isDayjs(baseDate) ? baseDate : dayjs(baseDate);
    const newDayjs = dayjs.isDayjs(newDate) ? newDate : dayjs(newDate);
    return base
        .set('year', newDayjs.year())
        .set('month', newDayjs.month()) // dayjsは0始まりなのでそのままでOK
        .set('date', newDayjs.date());
};

// 時間のみを上書き
export const updateTime = (
    baseDate: dayjs.Dayjs | string,
    hour?: string | number,
    minute?: string | number
): dayjs.Dayjs => {
    const base = dayjs.isDayjs(baseDate) ? baseDate : dayjs(baseDate);

    return base
        .set('hour', hour !== undefined ? Number(hour) : base.hour())
        .set('minute', minute !== undefined ? Number(minute) : base.minute());
};

//時間のリストを生成
export const Hours = Array.from({ length: 24 }, (_, i) => i);
//分のリストを生成
export const Minutes = Array.from({ length: 60 }, (_, i) => i);
