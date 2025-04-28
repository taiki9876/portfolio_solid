import { SectionCardBox } from '@admin/features/home/components/SectionCardBox';
import { FlexStart } from '@admin/shared/components/Layout/FlexBox/FlexStart';
import DummyImage from '@admin/assets/images/tmp/graph.png';
import styles from './CustomerGraph.module.css';

//TODO: グラフの画像はダミーなので、グラフ描画ライブラリの選定と実装が必要
export const CustomerGraph = () => {
    return (
        <SectionCardBox>
            <FlexStart>
                <div className={`${styles.label} ${styles.all}`}>会員数</div>
                <div className={`${styles.label} ${styles.active}`}>アクティブ会員数</div>
            </FlexStart>
            <img src={DummyImage} alt="グラフ" className={styles.image} />
        </SectionCardBox>
    );
};
