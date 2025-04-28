import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import { Colors } from '@admin/assets/styles/colors';

type Props = {
    color?: string;
    size?: IconSizeType;
    onClick?: () => void;
};
export const TrashIcon = ({
    color = Colors.text,
    size = IconSize.sm,
    onClick = undefined,
}: Props) => {
    return (
        <svg
            width={size}
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <path
                d="M4 7.5H20M10 11.5V17.5M14 11.5V17.5M5 7.5L6 19.5C6 20.6046 6.89543 21.5 8 21.5H16C17.1046 21.5 18 20.6046 18 19.5L19 7.5M9 7.5V4.5C9 3.94772 9.44772 3.5 10 3.5H14C14.5523 3.5 15 3.94772 15 4.5V7.5"
                stroke={color}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
