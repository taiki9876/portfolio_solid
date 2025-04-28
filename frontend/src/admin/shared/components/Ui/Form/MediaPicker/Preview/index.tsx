import { CrossIcon } from '@admin/shared/components/Ui/Icon/CrossIcon';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import styles from '../MediaPicker.module.css';

type Props = {
    media: File | undefined;
    preview: string | undefined;
    handleInputClear: () => void;
};
export const Preview = ({ media, preview, handleInputClear }: Props) => {
    const renderPreview = () => {
        if (media?.type.startsWith('image/') === true) {
            return <img src={preview} alt="preview" className={styles.preview} />;
        }

        if (media?.type.startsWith('video/') === true) {
            return <video src={preview} className={styles.preview} controls />;
        }

        return null;
    };

    return (
        <div>
            {renderPreview()}
            <div className={styles.previewClose}>
                <CrossIcon onClick={handleInputClear} size={IconSize.md} />
            </div>
        </div>
    );
};
