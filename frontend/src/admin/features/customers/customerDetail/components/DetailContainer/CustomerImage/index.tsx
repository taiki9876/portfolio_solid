import dummyImage from '@admin/assets/images/tmp/Frame1561.png';
import { SectionTitle } from '@admin/shared/components/Ui/DetailComponents/SectionTitle';
import commonStyles from '../DetailContainer.module.css';
import styles from './CustomerImage.module.css';

export const CustomerImage = () => {
    return (
        <div className={commonStyles.infoSection}>
            <SectionTitle title="画像" />
            <div className={styles.imageContainer}>
                <div className={styles.mainImage}>
                    <img src={dummyImage} alt="dummy" />
                </div>
                <div className={styles.subImages}>
                    <img src={dummyImage} alt="dummy" />
                    <img src={dummyImage} alt="dummy" />
                    <img src={dummyImage} alt="dummy" />
                    <img src={dummyImage} alt="dummy" />
                    <img src={dummyImage} alt="dummy" />
                    <img src={dummyImage} alt="dummy" />
                </div>
            </div>
        </div>
    );
};
