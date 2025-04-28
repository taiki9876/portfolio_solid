import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import { Colors } from '@admin/assets/styles/colors';

type Props = {
    color?: string;
    size?: IconSizeType;
    onClick?: () => void;
};
export const HomeIcon = ({
    color = Colors.text,
    size = IconSize.sm,
    onClick = undefined,
}: Props) => {
    return (
        <svg
            width={size}
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <path
                d="M3.5 21H21.5M3.5 7V8C3.5 9.65685 4.84315 11 6.5 11C8.15685 11 9.5 9.65685 9.5 8M3.5 7H21.5M3.5 7L5.5 3H19.5L21.5 7M9.5 8V7M9.5 8C9.5 9.65685 10.8431 11 12.5 11C14.1569 11 15.5 9.65685 15.5 8M15.5 8V7M15.5 8C15.5 9.65685 16.8431 11 18.5 11C20.1569 11 21.5 9.65685 21.5 8V7M5.5 21V10.85M19.5 21V10.85M9.5 21V17C9.5 15.8954 10.3954 15 11.5 15H13.5C14.6046 15 15.5 15.8954 15.5 17V21"
                stroke={color}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3.5 21H21.5M3.5 7V8C3.5 9.65685 4.84315 11 6.5 11C8.15685 11 9.5 9.65685 9.5 8M3.5 7H21.5M3.5 7L5.5 3H19.5L21.5 7M9.5 8V7M9.5 8C9.5 9.65685 10.8431 11 12.5 11C14.1569 11 15.5 9.65685 15.5 8M15.5 8V7M15.5 8C15.5 9.65685 16.8431 11 18.5 11C20.1569 11 21.5 9.65685 21.5 8V7M5.5 21V10.85M19.5 21V10.85M9.5 21V17C9.5 15.8954 10.3954 15 11.5 15H13.5C14.6046 15 15.5 15.8954 15.5 17V21"
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
