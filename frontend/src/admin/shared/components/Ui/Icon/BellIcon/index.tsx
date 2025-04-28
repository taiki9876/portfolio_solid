import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import { Colors } from '@admin/assets/styles/colors';

type Props = {
    color?: string;
    size?: IconSizeType;
    onClick?: () => void;
};
export const BellIcon = ({
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
                d="M9.5 17V18C9.5 19.6569 10.8431 21 12.5 21C14.1569 21 15.5 19.6569 15.5 18V17M10.5 5C10.5 3.89543 11.3954 3 12.5 3C13.6046 3 14.5 3.89543 14.5 5C16.8402 6.10655 18.3786 8.41425 18.5 11V14C18.6526 15.2608 19.3949 16.3742 20.5 17H4.5C5.60511 16.3742 6.34739 15.2608 6.5 14V11C6.62137 8.41425 8.15983 6.10655 10.5 5Z"
                stroke={color}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.5 17V18C9.5 19.6569 10.8431 21 12.5 21C14.1569 21 15.5 19.6569 15.5 18V17M10.5 5C10.5 3.89543 11.3954 3 12.5 3C13.6046 3 14.5 3.89543 14.5 5C16.8402 6.10655 18.3786 8.41425 18.5 11V14C18.6526 15.2608 19.3949 16.3742 20.5 17H4.5C5.60511 16.3742 6.34739 15.2608 6.5 14V11C6.62137 8.41425 8.15983 6.10655 10.5 5Z"
                strokeOpacity="0.2"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
