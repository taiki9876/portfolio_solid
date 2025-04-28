import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import { Colors } from '@admin/assets/styles/colors';

type Props = {
    color?: string;
    size?: IconSizeType;
    onClick?: () => void;
};
export const MapIcon = ({
    color = Colors.text,
    size = IconSize.sm,
    onClick = undefined,
}: Props) => {
    return (
        <svg
            width={size}
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <path
                d="M16 5.0001V5.0101M8.5 3.75009L7 3.00009M7 3.00009L1 6.00009V19.0001L7 16.0001M7 3.00009V16.0001M7 16.0001L13 19.0001M13 19.0001L19 16.0001V14.0001M13 19.0001V14.0001M16 12.0001L12.5 7.00006C11.5691 5.31758 11.967 3.21081 13.4475 1.98382C14.928 0.756819 17.072 0.756819 18.5525 1.98382C20.0329 3.21081 20.4309 5.31758 19.5 7.00006L16 12.0001Z"
                stroke={color}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16 5.0001V5.0101M8.5 3.75009L7 3.00009M7 3.00009L1 6.00009V19.0001L7 16.0001M7 3.00009V16.0001M7 16.0001L13 19.0001M13 19.0001L19 16.0001V14.0001M13 19.0001V14.0001M16 12.0001L12.5 7.00006C11.5691 5.31758 11.967 3.21081 13.4475 1.98382C14.928 0.756819 17.072 0.756819 18.5525 1.98382C20.0329 3.21081 20.4309 5.31758 19.5 7.00006L16 12.0001Z"
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
