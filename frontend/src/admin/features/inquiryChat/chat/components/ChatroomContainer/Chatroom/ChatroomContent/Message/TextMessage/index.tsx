import { MessageType } from '@admin/domain/chat/models/MessageType';
import { UrlMessage } from '@admin/shared/components/Ui/Typography/UrlMessage';
import styles from '../Message.module.css';

type Props = { item: MessageType; isReceive: boolean };
export const TextMessage = ({ item, isReceive }: Props) => {
    return (
        <div
            className={`${styles.messageBase} ${isReceive ? styles.receiveMessage : styles.sendMessage}`}
        >
            <p>
                <UrlMessage contentKey={item.id} content={item.content} />
            </p>
        </div>
    );
};
