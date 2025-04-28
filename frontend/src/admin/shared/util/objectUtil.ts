export const isDeepEqual = <T>(obj1: T, obj2: T): boolean => {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1) as Array<keyof T>;
    const keys2 = Object.keys(obj2) as Array<keyof T>;

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) => isDeepEqual(obj1[key], obj2[key]));
};

/** オブジェクトのキャメルケースキーをスネークケースに変換する */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const camelToSnake = <T extends Record<string, any>>(obj: T): Record<string, any> => {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
            const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
            return [snakeKey, value instanceof Object ? camelToSnake(value) : value];
        })
    );
};

/** オブジェクトのスネークケースキーをキャメルケースに変換する */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const snakeToCamel = <T extends Record<string, any>>(obj: T): Record<string, any> => {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
            const camelKey = key.replace(/_([a-z])/g, (match) => match[1].toUpperCase());
            return [camelKey, value instanceof Object ? snakeToCamel(value) : value];
        })
    );
};
