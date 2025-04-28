import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import { Colors } from '@admin/assets/styles/colors';

type Props = {
    color?: string;
    size?: IconSizeType;
    onClick?: () => void;
};
export const PaperClipIcon = ({
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
                d="M15.0007 6.99996L8.50068 13.5C7.67225 14.3284 7.67225 15.6715 8.50068 16.5C9.32911 17.3284 10.6723 17.3284 11.5007 16.5L18.0007 9.99996C19.6575 8.34311 19.6575 5.65682 18.0007 3.99996C16.3438 2.34311 13.6575 2.34311 12.0007 3.99996L5.50068 10.5C3.0154 12.9852 3.0154 17.0147 5.50068 19.5C7.98596 21.9852 12.0154 21.9852 14.5007 19.5L21.0007 13"
                stroke={color}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
