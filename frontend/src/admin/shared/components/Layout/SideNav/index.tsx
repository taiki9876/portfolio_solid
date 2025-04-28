import { Logo } from '@admin/shared/components/Layout/SideNav/Logo';
import { SIDE_NAV_WIDTH, Z_INDEX_SIDENAV } from '@admin/constants';
import { SideNavItemContainer } from '@admin/shared/components/Layout/SideNav/SideNavItemContainer';
import { useAuthStore } from '@admin/shared/state/globalState';
import { isSystemAdmin } from '@admin/domain/admin/model';
import { SystemAdminSideNavLinks } from './navDefinitionSystemAdmin';
import styles from './SideNav.module.css';
import { SideNavLinks } from './navDefinition';

export const SideNav = () => {
    const { admin } = useAuthStore();

    const navList = isSystemAdmin(admin) ? SystemAdminSideNavLinks : SideNavLinks;

    return (
        <div
            className={styles.sidenav}
            style={{ width: `${SIDE_NAV_WIDTH}px`, zIndex: Z_INDEX_SIDENAV }}
        >
            <Logo />
            {admin !== undefined && (
                <ul className={styles.sidenavUl}>
                    {navList.map((navLink, index) => (
                        <SideNavItemContainer key={`${navLink.type}-${index}`} navLink={navLink} />
                    ))}
                </ul>
            )}
        </div>
    );
};
