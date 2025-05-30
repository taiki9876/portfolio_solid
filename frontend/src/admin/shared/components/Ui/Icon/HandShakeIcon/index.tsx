import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import { Colors } from '@admin/assets/styles/colors';

type Props = {
    color?: string;
    size?: IconSizeType;
    onClick?: () => void;
};
export const HandShakeIcon = ({
    color = Colors.text,
    size = IconSize.sm,
    onClick = undefined,
}: Props) => {
    return (
        <svg
            width={size}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <path
                d="M24 40L36 28L32 32L28 36L24 40ZM24 40L4 20L16 8L24 16"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17 23L32 8L44 20L36 28L28 20L22 26L17 23ZM17 23L24 16"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M28 36L25 33"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M32 32L29 29"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
