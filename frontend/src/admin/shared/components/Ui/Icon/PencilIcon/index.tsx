import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import { Colors } from '@admin/assets/styles/colors';

type Props = {
    color?: string;
    size?: IconSizeType;
    onClick?: () => void;
};
export const PencilIcon = ({
    color = Colors.text,
    size = IconSize.sm,
    onClick = undefined,
}: Props) => {
    return (
        <svg
            width={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <path
                d="M13.5 6.5L17.5 10.5M4 20.0001H8L18.5 9.50006C19.6046 8.39549 19.6046 6.60463 18.5 5.50006C17.3954 4.39549 15.6046 4.39549 14.5 5.50006L4 16.0001V20.0001Z"
                stroke={color}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
