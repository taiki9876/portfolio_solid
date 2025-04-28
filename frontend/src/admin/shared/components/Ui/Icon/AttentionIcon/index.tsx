import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import { Colors } from '@admin/assets/styles/colors';

type Props = {
    color?: string;
    size?: IconSizeType;
    onClick?: () => void;
};
export const AttentionIcon = ({
    color = Colors.red,
    size = IconSize.sm,
    onClick = undefined,
}: Props) => {
    return (
        <svg
            width={size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <rect width="16" height="16" rx="8" fill={color} />
            <path
                d="M7.99935 12.6667V12.6733"
                stroke="white"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.99935 9.99998V3.33331"
                stroke="white"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
