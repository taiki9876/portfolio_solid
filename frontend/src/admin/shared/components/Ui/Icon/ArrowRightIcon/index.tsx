import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import { Colors } from '@admin/assets/styles/colors';

type Props = {
    color?: string;
    size?: IconSizeType;
    onClick?: () => void;
};
export const ArrowRightIcon = ({
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
                d="M19 12L31 24L19 36"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
