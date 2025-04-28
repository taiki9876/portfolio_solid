import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import { Colors } from '@admin/assets/styles/colors';

type Props = {
    color?: string;
    size?: IconSizeType;
    onClick?: () => void;
};
export const DashboardIcon = ({
    color = Colors.text,
    size = IconSize.sm,
    onClick = undefined,
}: Props) => {
    return (
        <svg
            width={size}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <path
                d="M11 14H17M14 11V17M2 7H6C6.55228 7 7 6.55228 7 6V2C7 1.44772 6.55228 1 6 1H2C1.44772 1 1 1.44772 1 2V6C1 6.55228 1.44772 7 2 7ZM12 7H16C16.5523 7 17 6.55228 17 6V2C17 1.44772 16.5523 1 16 1H12C11.4477 1 11 1.44772 11 2V6C11 6.55228 11.4477 7 12 7ZM2 17H6C6.55228 17 7 16.5523 7 16V12C7 11.4477 6.55228 11 6 11H2C1.44772 11 1 11.4477 1 12V16C1 16.5523 1.44772 17 2 17Z"
                stroke={color}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
