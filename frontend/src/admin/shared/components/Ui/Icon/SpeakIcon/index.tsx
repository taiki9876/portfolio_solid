import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import { Colors } from '@admin/assets/styles/colors';

type Props = {
    color?: string;
    size?: IconSizeType;
    onClick?: () => void;
};
export const SpeakIcon = ({
    color = Colors.text,
    size = IconSize.sm,
    onClick = undefined,
}: Props) => {
    return (
        <svg
            width={size}
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <path
                d="M16 5C17.6569 5 19 6.34315 19 8C19 9.65685 17.6569 11 16 11M8 5V16C8 16.5523 7.55228 17 7 17H6C5.44772 17 5 16.5523 5 16V11M10 4.99996L14.524 1.22996C14.7924 1.00643 15.1658 0.958349 15.482 1.10661C15.7983 1.25487 16.0002 1.5727 16 1.92196V14.078C16.0002 14.4272 15.7983 14.745 15.482 14.8933C15.1658 15.0416 14.7924 14.9935 14.524 14.77L10 11H2C1.44772 11 1 10.5522 1 9.99996V5.99996C1 5.44767 1.44772 4.99996 2 4.99996H10Z"
                stroke={color}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M16 5C17.6569 5 19 6.34315 19 8C19 9.65685 17.6569 11 16 11M8 5V16C8 16.5523 7.55228 17 7 17H6C5.44772 17 5 16.5523 5 16V11M10 4.99996L14.524 1.22996C14.7924 1.00643 15.1658 0.958349 15.482 1.10661C15.7983 1.25487 16.0002 1.5727 16 1.92196V14.078C16.0002 14.4272 15.7983 14.745 15.482 14.8933C15.1658 15.0416 14.7924 14.9935 14.524 14.77L10 11H2C1.44772 11 1 10.5522 1 9.99996V5.99996C1 5.44767 1.44772 4.99996 2 4.99996H10Z"
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
