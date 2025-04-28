export const IconSize = {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 56,
    xxl: 64,
} as const;
export type IconSizeType = (typeof IconSize)[keyof typeof IconSize];
