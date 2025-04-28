import { MessageType } from '@admin/domain/chat/models/MessageType';
import styles from './ProcessedMessage.module.css';

type Props = {
    message: MessageType;
};
export const ProcessedMessage = ({ message }: Props) => {
    if (message.contentType !== 'processed') {
        return null;
    }

    return (
        <div className={styles.processedMessage}>
            <span className={styles.processedText}>{message.content}</span>
        </div>
    );
};
