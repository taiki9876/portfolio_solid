import { SIDE_NAV_WIDTH } from '@admin/constants';
import { Breadcrumb } from '@admin/shared/components/Layout/Header/Breadcrumb';
import { NavItem } from '@admin/shared/components/Layout/Header/NavItem';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { HelpIcon } from '@admin/shared/components/Ui/Icon/HelpIcon';
import { UserCircleIcon } from '@admin/shared/components/Ui/Icon/UserCircleIcon';
import { useAuthStore } from '@admin/shared/state/globalState';
import { truncateString } from '@admin/shared/util/stringUtil';
import { isStoreAdmin } from '@admin/domain/admin/model';
import { PeopleIcon } from '@admin/shared/components/Ui/Icon/PeopleIcon';
import { useChangeSystemAccount } from '@admin/features/systemAdmin/shared/hooks/useChangeSystemAccount';
import styles from './Header.module.css';

export const Header = () => {
    const { admin } = useAuthStore();
    const { handleChangeAccount } = useChangeSystemAccount();

    return (
        <header className={styles.header} style={{ paddingLeft: `${SIDE_NAV_WIDTH + 24}px` }}>
            <Breadcrumb />
            <div className={styles.navItemContainer}>
                {isStoreAdmin(admin) && (
                    <>
                        <div className={styles.contractName}>
                            {truncateString(admin?.contractName ?? '', 10, true)}
                        </div>
                        <NavItem label="管理者" icon={PeopleIcon} onClick={handleChangeAccount} />
                    </>
                )}

                <NavItem
                    label="ヘルプ"
                    icon={HelpIcon}
                    onClick={() => alert('ヘルプページなどに飛ばす')}
                />
                <NavItem
                    label="ログアウト"
                    icon={UserCircleIcon}
                    onClick={() => ApiEndpoint.auth.logout()}
                />
            </div>
        </header>
    );
};
