import { MessageType } from '@admin/domain/chat/models/MessageType';
import { FulfilledPlaceholder } from '@admin/shared/components/Ui/Placeholder/FulfilledPlaceholder';
import styles from '../Message.module.css';
import { useVideoMessage } from './useVideoMessage';

type Props = { item: MessageType; isReceive: boolean };
export const VideoMessage = ({ item, isReceive }: Props) => {
    const { src } = useVideoMessage(item);

    return (
        <div
            className={`${styles.messageBase} ${styles.mediaMessage} ${isReceive ? styles.receiveMessage : styles.sendMessage}`}
        >
            {src === undefined ? (
                <div className={styles.placeholderContainer}>
                    <FulfilledPlaceholder />
                </div>
            ) : (
                <video src={src} height={180} controls />
            )}
        </div>
    );
};
