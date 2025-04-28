import { THUMBNAIL_SIZE_16_9 } from '@admin/constants';
import styles from '../InfoItemRow.module.css';

type Props = {
    src: string;
};
export const ImageItem = ({ src }: Props) => {
    return (
        <div style={{ ...THUMBNAIL_SIZE_16_9 }} className={styles.imageContainer}>
            <img src={src} alt="画像" className={styles.image} />
        </div>
    );
};
