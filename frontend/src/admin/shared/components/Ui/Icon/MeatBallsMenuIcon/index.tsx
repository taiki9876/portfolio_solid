import { MouseEvent as ReactMouseEvent } from 'react';
import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import { Colors } from '@admin/assets/styles/colors';

type Props = {
    color?: string;
    size?: IconSizeType;
    onClick?: (event: ReactMouseEvent<SVGSVGElement, MouseEvent>) => void;
};
export const MeatBallsMenuIcon = ({
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
            <circle cx="12" cy="24" r="3" fill={color} />
            <circle cx="24" cy="24" r="3" fill={color} />
            <circle cx="36" cy="24" r="3" fill={color} />
        </svg>
    );
};
