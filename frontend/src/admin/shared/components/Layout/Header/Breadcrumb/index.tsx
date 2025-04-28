import { route } from '@admin/routes/type';
import { Link } from 'react-router-dom';
import { isLastIndex } from '@admin/shared/util/arrayUtil';
import { useBreadcrumbStore } from '@admin/shared/state/globalState';
import { Colors } from '@admin/assets/styles/colors';
import { ArrowRightIcon } from '@admin/shared/components/Ui/Icon/ArrowRightIcon';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import { isLinkItem, isPlaneItem } from '@admin/shared/state/slice/ui/breadcrumbStore';
import { truncateString } from '@admin/shared/util/stringUtil';
import styles from './Breadcrumb.module.css';

const MAX_LENGTH = 8;
export const Breadcrumb = () => {
    const { routeNames } = useBreadcrumbStore();

    return (
        <div className={`${styles.flex} ${styles.headerContainer}`}>
            {routeNames.map((routeName, index: number) => {
                if (isPlaneItem(routeName)) {
                    return (
                        <span key={`plane-${index}`} style={{ color: Colors.text }}>
                            {truncateString(routeName.name, MAX_LENGTH, true)}
                        </span>
                    );
                }

                if (isLinkItem(routeName)) {
                    return (
                        <div key={routeName.path} className={styles.item}>
                            <Link
                                to={routeName.path}
                                className={styles.flex}
                                style={{ color: Colors.primary }}
                            >
                                {truncateString(routeName.linkName, MAX_LENGTH, true)}
                            </Link>
                            <ArrowRightIcon size={IconSize.sm} />
                        </div>
                    );
                }

                if (isLastIndex(routeNames, index)) {
                    return (
                        <span key={routeName} style={{ color: Colors.text }}>
                            {truncateString(route(routeName).displayName, MAX_LENGTH, true)}
                        </span>
                    );
                }

                return (
                    <div key={routeName} className={styles.item}>
                        <Link
                            to={route(routeName).path}
                            className={styles.flex}
                            style={{ color: Colors.primary }}
                        >
                            {truncateString(route(routeName).displayName, MAX_LENGTH, true)}
                        </Link>
                        <ArrowRightIcon size={IconSize.sm} />
                    </div>
                );
            })}
        </div>
    );
};
