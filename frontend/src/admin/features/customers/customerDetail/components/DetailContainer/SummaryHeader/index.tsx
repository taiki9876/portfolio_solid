import styles from './SummaryHeader.module.css';
import { SummaryItem } from './SummaryItem';

export const SummaryHeader = () => {
    return (
        <div className={styles.summaryHeaderContainer}>
            <SummaryItem name="登録日" value="2022/03/12" />
            <SummaryItem name="最終来店日" value="2022/03/12" />
            <SummaryItem name="取引回数" value="4回" />
            <SummaryItem name="会員ランク" value="ノーマル" />
            <SummaryItem name="保有ポイント数" value="55ポイント" />
            <SummaryItem name="保有クーポン数" value="57回" />
            <SummaryItem name="保有スタンプ数" value="3回" />
        </div>
    );
};
