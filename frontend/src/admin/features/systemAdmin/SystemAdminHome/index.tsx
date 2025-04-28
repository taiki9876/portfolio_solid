import styles from './SystemAdminHome.module.css';

export const SystemAdminHome = () => {
    return (
        <div className={styles.homeContainer}>
            <p className={styles.description}>
                システム管理者アカウントです。 このアカウントでは以下の操作が可能です。
            </p>
            <div className={styles.list}>
                <div className={styles.item}>
                    <span>契約情報の管理</span>
                    <ul>
                        <li>契約情報の会員数の確認</li>
                        <li>契約情報の有効化・無効化</li>
                        <li>店舗情報の管理（追加・編集・削除）</li>
                    </ul>
                </div>
                <hr />
                <div className={styles.item}>
                    <span>運営からのお知らせの管理</span>
                    <ul>
                        <li>各アカウントへのお知らせ文章を登録</li>
                    </ul>
                </div>
                <hr />
                <div className={styles.item}>
                    <span>サポートアカウントへの切り替え</span>
                    <ul>
                        <li>各店舗様の設定状況の確認・設定のサポートとして</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
