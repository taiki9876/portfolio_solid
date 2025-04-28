import { CSSProperties } from 'react';
import { Z_INDEX_MODAL } from '@admin/constants';
import { PressableBackground } from '@admin/shared/components/Ui/Modal/BaseModal';
import styles from './CompactModalMenu.module.css';
import { MenuitemType, MenuItem } from './MenuItem';

type Props = {
    menuItems: MenuitemType[];
    isOpen: boolean;
    closeModal: () => void;
    className?: string;
    extraStyles?: CSSProperties;
};
export const CompactModal = ({ menuItems, isOpen, closeModal, className, extraStyles }: Props) => {
    if (isOpen === false) {
        return null;
    }
    return (
        <>
            <PressableBackground onClose={closeModal} opacity={0} />
            <div
                className={`${styles.menuContainer} ${className}`}
                style={{ zIndex: Z_INDEX_MODAL, ...extraStyles }}
            >
                <ul className={styles.listContainer}>
                    {menuItems.map((item, index) => (
                        <MenuItem key={`status-menu-${index}`} item={item} />
                    ))}
                </ul>
            </div>
        </>
    );
};
