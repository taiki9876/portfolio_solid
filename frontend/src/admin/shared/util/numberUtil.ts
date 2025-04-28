//数値を指定した桁数になるように0埋めする ※戻り値は文字列
export const zeroPadding = (num: number, length: number) => {
    return (Array(length).join('0') + num).slice(-length);
};

//指定した時間のミリ秒を取得する
export const mSecondsFrom = (value: number, unit: 'day' | 'hour' | 'minute' | 'second'): number => {
    switch (unit) {
        case 'day':
            return value * 24 * 60 * 60 * 1000;
        case 'hour':
            return value * 60 * 60 * 1000;
        case 'minute':
            return value * 60 * 1000;
        case 'second':
            return value * 1000;
        default:
            return 0;
    }
};

//ランダムな整数を生成する ※開発中のuuid生成などに使用
export const randomNumber = () => {
    const randomNum = Math.floor(Math.random() * 10 ** 8);
    return randomNum.toString().padStart(14, '0');
};

//数値にプラスマイナスをつける
export const formatSignedNumber = (num: number): string => {
    if (num > 0) {
        return `+${num}`;
    }

    if (num < 0) {
        return `${num}`;
    }

    return '0';
};

//数値に3桁ごとにカンマを挿入する
export const addThousandSeparators = (num: number, separator: string = ','): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};
