import { Avatar } from '@admin/shared/components/Ui/Avatar';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import { MessageType } from '@admin/domain/chat/models/MessageType';
import styles from './Message.module.css';
import { ProcessedMessage } from './ProcessedMessage';
import { TextMessage } from './TextMessage';
import { MessageInfo } from './MessageInfo';
import { PhotoMessage } from './PhotoMessage';
import { VideoMessage } from './VideoMessage';

type Props = {
    message: MessageType;
    isReceive: boolean;
};
export const Message = ({ message, isReceive }: Props) => {
    const renderMessage = () => {
        if (message.contentType === 'photo') {
            return <PhotoMessage item={message} isReceive={isReceive} />;
        }

        if (message.contentType === 'video') {
            return <VideoMessage item={message} isReceive={isReceive} />;
        }

        return <TextMessage item={message} isReceive={isReceive} />;
    };

    if (message.contentType === 'processed') {
        return <ProcessedMessage message={message} />;
    }

    return (
        <div
            className={`${styles.messageRow} ${isReceive ? styles.flexRow : styles.flexRowReverse}`}
        >
            {isReceive && <Avatar size={IconSize.md} extraClassName={styles.avatar} />}
            {renderMessage()}
            <MessageInfo isReceive={isReceive} message={message} />
        </div>
    );
};
