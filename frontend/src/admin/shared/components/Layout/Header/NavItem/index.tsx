import { ComponentType } from 'react';
import { Colors } from '@admin/assets/styles/colors';
import styles from './NavItem.module.css';

type Props = {
    label: string;
    icon: ComponentType<{ color: string }>;
    onClick: () => void;
};
export const NavItem = ({ label, icon: Icon, onClick }: Props) => {
    return (
        <div className={styles.navItem} onClick={onClick}>
            <Icon color={Colors.black} />
            <span>{label}</span>
        </div>
    );
};
