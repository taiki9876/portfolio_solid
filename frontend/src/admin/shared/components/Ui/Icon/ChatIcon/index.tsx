import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import { Colors } from '@admin/assets/styles/colors';

type Props = {
    color?: string;
    size?: IconSizeType;
    onClick?: () => void;
};
export const ChatIcon = ({
    color = Colors.text,
    size = IconSize.sm,
    onClick = undefined,
}: Props) => {
    return (
        <svg
            width={size}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <path
                d="M5.5 11.5C8 14 12 14 14.5 11.5M15.802 15.292C15.802 15.292 15.879 15.237 16.002 15.143C17.845 13.718 19 11.653 19 9.354C19 5.068 14.97 1.59 10.002 1.59C5.032 1.59 1 5.068 1 9.354C1 13.642 5.03 17 10 17C10.424 17 11.12 16.972 12.088 16.916C13.35 17.736 15.192 18.409 16.804 18.409C17.303 18.409 17.538 17.999 17.218 17.581C16.732 16.985 16.062 16.031 15.802 15.292Z"
                stroke={color}
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.5 11.5C8 14 12 14 14.5 11.5M15.802 15.292C15.802 15.292 15.879 15.237 16.002 15.143C17.845 13.718 19 11.653 19 9.354C19 5.068 14.97 1.59 10.002 1.59C5.032 1.59 1 5.068 1 9.354C1 13.642 5.03 17 10 17C10.424 17 11.12 16.972 12.088 16.916C13.35 17.736 15.192 18.409 16.804 18.409C17.303 18.409 17.538 17.999 17.218 17.581C16.732 16.985 16.062 16.031 15.802 15.292Z"
                stroke="white"
                strokeOpacity="0.2"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
