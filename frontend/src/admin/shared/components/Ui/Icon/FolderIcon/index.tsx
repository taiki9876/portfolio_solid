import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import { Colors } from '@admin/assets/styles/colors';

type Props = {
    color?: string;
    size?: IconSizeType;
    onClick?: () => void;
};
export const FolderIcon = ({
    color = Colors.text,
    size = IconSize.sm,
    onClick = undefined,
}: Props) => {
    return (
        <svg
            width={size}
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <path
                d="M15 14.0001V16.0001C15 17.1047 14.1046 18.0001 13 18.0001H3C1.89543 18.0001 1 17.1047 1 16.0001V7.00009C1 5.89552 1.89543 5.00009 3 5.00009H5M7 1.00009H10L12 3.00009H17C18.1046 3.00009 19 3.89552 19 5.00009V12.0001C19 13.1047 18.1046 14.0001 17 14.0001H7C5.89543 14.0001 5 13.1047 5 12.0001V3.00009C5 1.89552 5.89543 1.00009 7 1.00009Z"
                stroke={color}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15 14.0001V16.0001C15 17.1047 14.1046 18.0001 13 18.0001H3C1.89543 18.0001 1 17.1047 1 16.0001V7.00009C1 5.89552 1.89543 5.00009 3 5.00009H5M7 1.00009H10L12 3.00009H17C18.1046 3.00009 19 3.89552 19 5.00009V12.0001C19 13.1047 18.1046 14.0001 17 14.0001H7C5.89543 14.0001 5 13.1047 5 12.0001V3.00009C5 1.89552 5.89543 1.00009 7 1.00009Z"
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
