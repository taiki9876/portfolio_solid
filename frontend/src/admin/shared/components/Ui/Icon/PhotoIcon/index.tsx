import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import { Colors } from '@admin/assets/styles/colors';

type Props = {
    color?: string;
    size?: IconSizeType;
    onClick?: () => void;
};
export const PhotoIcon = ({
    color = Colors.text,
    size = IconSize.sm,
    onClick = undefined,
}: Props) => {
    return (
        <svg
            width={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <path
                d="M19.9995 10.6666H20.0129M5.33301 19.9999L10.6663 14.6666C11.9039 13.4757 13.4287 13.4757 14.6663 14.6666L21.333 21.3332M18.6663 18.6666L19.9997 17.3332C21.2373 16.1424 22.7621 16.1424 23.9997 17.3332L26.6663 19.9999M9.33301 26.6666H22.6663C24.8755 26.6666 26.6663 24.8758 26.6663 22.6666V9.33331C26.6663 7.12417 24.8755 5.33331 22.6663 5.33331H9.33301C7.12387 5.33331 5.33301 7.12417 5.33301 9.33331V22.6666C5.33301 24.8758 7.12387 26.6666 9.33301 26.6666Z"
                stroke={color}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M19.9995 10.6666H20.0129M5.33301 19.9999L10.6663 14.6666C11.9039 13.4757 13.4287 13.4757 14.6663 14.6666L21.333 21.3332M18.6663 18.6666L19.9997 17.3332C21.2373 16.1424 22.7621 16.1424 23.9997 17.3332L26.6663 19.9999M9.33301 26.6666H22.6663C24.8755 26.6666 26.6663 24.8758 26.6663 22.6666V9.33331C26.6663 7.12417 24.8755 5.33331 22.6663 5.33331H9.33301C7.12387 5.33331 5.33301 7.12417 5.33301 9.33331V22.6666C5.33301 24.8758 7.12387 26.6666 9.33301 26.6666Z"
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
