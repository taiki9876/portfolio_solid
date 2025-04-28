export const isLastIndex = <T>(target: T[], index: number): boolean => {
    return target.length - 1 === index;
};

export const random = <T>(value: T[]): T | undefined => {
    if (value.length === 0) return undefined;
    const randomIndex = Math.floor(Math.random() * value.length);
    return value[randomIndex];
};

// 範囲内の数値の配列を生成
export const range = (start: number, end: number): number[] => {
    if (start > end) {
        throw new Error('start は end より小さい値である必要があります');
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};
