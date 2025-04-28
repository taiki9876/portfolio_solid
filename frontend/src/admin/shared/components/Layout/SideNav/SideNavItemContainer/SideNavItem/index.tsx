import { Link } from 'react-router-dom';
import { useIconColor } from '../helper';
import { SideNavLinkType } from '../../type';
import styles from './../SideNavItem.module.css';

type Props = {
    navLink: SideNavLinkType;
    isActive: boolean;
    isIndent?: boolean;
};
export const SideNavItem = ({ navLink, isActive, isIndent = false }: Props) => {
    const { iconColor, handleMouseLeave, handleMouseOver } = useIconColor(isActive);
    const { config, icon: Icon } = navLink;

    return (
        <li className={styles.sidenavLi}>
            <Link
                className={`${styles.sidenavLink} ${isActive ? styles.active : ''}`}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                to={config.path}
            >
                <div
                    className={styles.sidenavLabel}
                    style={{ paddingLeft: isIndent ? '24px' : '0' }}
                >
                    <Icon color={iconColor} />
                    {config.displayName}
                </div>
            </Link>
        </li>
    );
};
