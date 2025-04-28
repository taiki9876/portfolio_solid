import { MessageType } from '@admin/domain/chat/models/MessageType';
import { Z_INDEX_MODAL } from '@admin/constants';
import { ModalBackground } from '@admin/shared/components/Ui/Modal/BaseModal';
import { useSwitch } from '@src/shared/hooks/useSwitch';
import { CrossIcon } from '@admin/shared/components/Ui/Icon/CrossIcon';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import { FulfilledPlaceholder } from '@admin/shared/components/Ui/Placeholder/FulfilledPlaceholder';
import { usePhotoMessage } from './usePhotoMessage';
import styles from '../Message.module.css';

type Props = { item: MessageType; isReceive: boolean };
export const PhotoMessage = ({ item, isReceive }: Props) => {
    const { src, isNoImage } = usePhotoMessage(item);
    const { isOn, on, off } = useSwitch();

    return (
        <>
            {isOn && src !== undefined && <PhotoModal src={src} close={off} />}
            <div
                className={`${styles.messageBase} ${styles.mediaMessage} ${isReceive ? styles.receiveMessage : styles.sendMessage}`}
                onClick={isNoImage ? undefined : on}
            >
                {src === undefined ? (
                    <div className={styles.placeholderContainer}>
                        <FulfilledPlaceholder />
                    </div>
                ) : (
                    <img src={src} alt="photo" className={styles.photoImage} height={180} />
                )}
            </div>
        </>
    );
};

type ModalProps = {
    src: string;
    close: () => void;
};
const PhotoModal = ({ src, close }: ModalProps) => {
    return (
        <ModalBackground onClose={close}>
            <div className={styles.photoImageClose} style={{ zIndex: Z_INDEX_MODAL + 1 }}>
                <CrossIcon onClick={close} size={IconSize.xxl} />
            </div>
            <img
                src={src}
                alt="photo"
                style={{ zIndex: Z_INDEX_MODAL }}
                className={styles.photoImage}
            />
        </ModalBackground>
    );
};
