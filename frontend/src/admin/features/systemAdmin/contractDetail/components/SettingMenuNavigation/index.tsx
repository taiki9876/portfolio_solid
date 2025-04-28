import { SectionTitle } from '@admin/shared/components/Ui/DetailComponents/SectionTitle';
import styles from '@admin/features/systemAdmin/contractDetail/components/ContractDetailContainer/ContractDetail.module.css';
import { SubMenu } from '@admin/features/systemAdmin/contractDetail/components/SubMenu';
import { resolvePath, route } from '@admin/routes/type';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';

type Props = {
    contractId: string;
};
export const SettingMenuNavigation = ({ contractId }: Props) => {
    return (
        <>
            <SectionTitle title="その他の設定" />
            <div className={styles.subMenuBox}>
                <SubMenu
                    label="店舗情報"
                    pagePath={resolvePath(SystemAdminRouteNames.shopList, {
                        contractId: contractId,
                    })}
                />
                <SubMenu label="クーポン" pagePath={route(SystemAdminRouteNames.home).path} />
                <SubMenu label="スタンプ" pagePath={route(SystemAdminRouteNames.home).path} />
                <SubMenu label="ポイント" pagePath={route(SystemAdminRouteNames.home).path} />
                <SubMenu label="ランク" pagePath={route(SystemAdminRouteNames.home).path} />
                <SubMenu label="ホーム" pagePath={route(SystemAdminRouteNames.home).path} />
                <SubMenu label="利用規約" pagePath={route(SystemAdminRouteNames.home).path} />
            </div>
        </>
    );
};
