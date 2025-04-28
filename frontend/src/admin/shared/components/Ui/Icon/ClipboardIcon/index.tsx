import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import { Colors } from '@admin/assets/styles/colors';

type Props = {
    color?: string;
    size?: IconSizeType;
    onClick?: () => void;
};
export const ClipboardIcon = ({
    color = Colors.text,
    size = IconSize.sm,
    onClick = undefined,
}: Props) => {
    return (
        <svg
            width={size}
            height={size * 1.25}
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <path
                d="M5 3.00009H3C1.89543 3.00009 1 3.89552 1 5.00009V17.0001C1 18.1047 1.89543 19.0001 3 19.0001H13C14.1046 19.0001 15 18.1047 15 17.0001V5.00009C15 3.89552 14.1046 3.00009 13 3.00009H11M5 3.00009C5 4.10466 5.89543 5.00009 7 5.00009H9C10.1046 5.00009 11 4.10466 11 3.00009M5 3.00009C5 1.89552 5.89543 1.00009 7 1.00009H9C10.1046 1.00009 11 1.89552 11 3.00009M5 15.0001V10.0001M8 15.0001V14.0001M11 15.0001V12.0001"
                stroke={color}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5 3.00009H3C1.89543 3.00009 1 3.89552 1 5.00009V17.0001C1 18.1047 1.89543 19.0001 3 19.0001H13C14.1046 19.0001 15 18.1047 15 17.0001V5.00009C15 3.89552 14.1046 3.00009 13 3.00009H11M5 3.00009C5 4.10466 5.89543 5.00009 7 5.00009H9C10.1046 5.00009 11 4.10466 11 3.00009M5 3.00009C5 1.89552 5.89543 1.00009 7 1.00009H9C10.1046 1.00009 11 1.89552 11 3.00009M5 15.0001V10.0001M8 15.0001V14.0001M11 15.0001V12.0001"
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
