import { useLocation } from 'react-router-dom';
import { SideNavItem } from './SideNavItem';
import { CategoryWithLinks } from './CategoryWithLinks';
import { isActive } from './helper';
import { SideNavLinkType, SideNavCategoryType } from '../type';

type Props = {
    navLink: SideNavLinkType | SideNavCategoryType;
};
export const SideNavItemContainer = ({ navLink }: Props) => {
    const { pathname: currentPagePath } = useLocation();

    if (navLink.type === 'category') {
        return <CategoryWithLinks navCategory={navLink} currentPagePath={currentPagePath} />;
    }

    return (
        <SideNavItem
            navLink={navLink}
            isActive={isActive(navLink.config.path, currentPagePath, navLink.allowPartialMatch)}
        />
    );
};
