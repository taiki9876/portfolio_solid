export type LabelWithKeyType = {
    label: string;
    key: string;
};
export const isLabelWithKeyType = (target: unknown): target is LabelWithKeyType => {
    if (typeof target !== 'object' || target === null) {
        return false;
    }
    const tmp = target as LabelWithKeyType;
    return tmp.label !== undefined && tmp.key !== undefined;
};

export type ValueWithKeyType = {
    value: string | number;
    key: string;
};
export const valueWithKeyFromObject = (
    target: Record<string, string | number | undefined>
): ValueWithKeyType[] => {
    return Object.entries(target).map(([key, value]) => ({
        key,
        value: value ?? '',
    }));
};
