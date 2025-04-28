import { ReactNode } from 'react';
import styles from './MenuItem.module.css';

export type MenuitemType = {
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
    hasBorderLine?: boolean;
};
type Props = {
    item: MenuitemType;
};
export const MenuItem = ({ item }: Props) => {
    return (
        <li
            className={`${styles.menuItem} ${item.hasBorderLine === true && styles.line}`}
            onClick={item.onClick}
        >
            {item.icon !== undefined && item.icon}
            {item.label}
        </li>
    );
};
