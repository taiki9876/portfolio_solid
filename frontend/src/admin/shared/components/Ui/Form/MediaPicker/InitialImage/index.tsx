import { CrossIcon } from '@admin/shared/components/Ui/Icon/CrossIcon';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import styles from '../MediaPicker.module.css';

type Props = {
    src: string | undefined;
    handleInputClear: () => void;
};
export const InitialImage = ({ src, handleInputClear }: Props) => {
    return (
        <div>
            <img src={src} alt="preview" className={styles.preview} />;
            <div className={styles.previewClose}>
                <CrossIcon onClick={handleInputClear} size={IconSize.md} />
            </div>
        </div>
    );
};
