import { ArrowDownIcon } from '@admin/shared/components/Ui/Icon/ArrowDownIcon';
import { ArrowUpIcon } from '@admin/shared/components/Ui/Icon/ArrowUpIcon';
import { useNavigate } from 'react-router-dom';
import { route } from '@admin/routes/type';
import { useSwitch } from '@src/shared/hooks/useSwitch';
import styles from '../SideNavItem.module.css';
import { SideNavCategoryType, SideNavLinkType } from '../../type';
import { SideNavItem } from '../SideNavItem';
import { isActive, useIconColor } from '../helper';

type Props = {
    navCategory: SideNavCategoryType;
    currentPagePath: string;
};
export const CategoryWithLinks = ({ navCategory, currentPagePath }: Props) => {
    const isCategoryActive = currentPagePath.startsWith(navCategory.pathPrefix);
    const { handleMouseLeave, handleMouseOver, iconColor } = useIconColor(isCategoryActive);
    const { isOn: isChildrenOpen, toggle: toggleCategory } = useSwitch(false);
    const navigate = useNavigate();

    return (
        <>
            <li className={styles.sidenavLi}>
                <div
                    className={`${styles.sidenavLink} ${isCategoryActive ? styles.active : ''}`}
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => {
                        toggleCategory();
                        if (isChildrenOpen === true) {
                            return;
                        }

                        void navigate(route(navCategory.rootChild).path);
                    }}
                >
                    <div className={styles.sidenavLabel}>
                        <navCategory.icon color={iconColor} />
                        {navCategory.label}
                    </div>
                    {isChildrenOpen ? (
                        <ArrowUpIcon color={iconColor} />
                    ) : (
                        <ArrowDownIcon color={iconColor} />
                    )}
                </div>
            </li>

            {isChildrenOpen && (
                <ChildrenRenderer
                    childrenLinks={navCategory.children}
                    currentPagePath={currentPagePath}
                />
            )}
        </>
    );
};

type ChildrenLinksProps = {
    childrenLinks: SideNavLinkType[];
    currentPagePath: string;
};
const ChildrenRenderer = ({ childrenLinks, currentPagePath }: ChildrenLinksProps) => {
    return (
        <ul>
            {childrenLinks.map((navLink) => (
                <SideNavItem
                    key={navLink.config.path}
                    navLink={navLink}
                    isActive={isActive(navLink.config.path, currentPagePath)}
                    isIndent={true}
                />
            ))}
        </ul>
    );
};
