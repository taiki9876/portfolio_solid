type Props = {
    type: 'Horizontal' | 'Vertical';
    size: 'small' | 'normal' | 'medium' | 'large';
};

const sizeMap: Record<Props['size'], number> = {
    small: 4,
    normal: 8,
    medium: 16,
    large: 32,
};
export const Spacer = ({ type, size }: Props) => {
    const style =
        type === 'Horizontal'
            ? { display: 'inline-block', width: sizeMap[size], height: 1 }
            : { display: 'block', width: 1, height: sizeMap[size] };

    return <div style={style} />;
};
