import commonStyle from '../Placeholder.module.css';
import styles from './SomeScreenPlaceholder.module.css';

//汎用的 ページのプレイスホルダー
export const SomeScreenPlaceholder = () => {
    return (
        <div>
            <div className={styles.section}>
                <div className={styles.flex}>
                    <div className={`${commonStyle.placeholder} ${styles.title}`} />
                    <div className={`${commonStyle.placeholder} ${styles.button}`} />
                </div>
                <div className={`${commonStyle.placeholder} ${styles.square}`} />
                <div className={`${commonStyle.placeholder} ${styles.text} ${styles.width75}`} />
                <div className={`${commonStyle.placeholder} ${styles.text} ${styles.width50}`} />
                <div className={`${commonStyle.placeholder} ${styles.text} ${styles.width100}`} />
                <div className={`${commonStyle.placeholder} ${styles.text} ${styles.width100}`} />
            </div>

            <div className={styles.section}>
                <div className={`${commonStyle.placeholder} ${styles.text}`} />
                <div className={`${commonStyle.placeholder} ${styles.text}`} />
                <div className={`${commonStyle.placeholder} ${styles.text}`} />
            </div>
        </div>
    );
};
