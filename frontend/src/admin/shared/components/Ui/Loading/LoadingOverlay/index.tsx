import { Z_INDEX_LOADING } from '@admin/constants';
import styles from './Loading.module.css';

type Props = {
    message?: string; // 任意のメッセージを表示
    size?: 'small' | 'medium'; // サイズを指定
    backgroundBlur?: boolean;
};
export const LoadingOverlay = ({ message = '', size = 'medium', backgroundBlur = true }: Props) => {
    return (
        <div
            data-testid="loading-component"
            className={`${styles.overlay} ${!backgroundBlur && styles.opacity}`}
            style={{ zIndex: Z_INDEX_LOADING }}
        >
            <div className={styles.container}>
                <div className={`${styles.spinner} ${size === 'small' && styles.sizeSmall}`} />
                <p className={styles.message}>{message}</p>
            </div>
        </div>
    );
};
