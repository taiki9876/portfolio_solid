import styles from './SmallLoading.module.css';

export const SmallLoading = () => {
    return (
        <div className={styles.smallLoading}>
            <div className={styles.spinner} />
        </div>
    );
};
