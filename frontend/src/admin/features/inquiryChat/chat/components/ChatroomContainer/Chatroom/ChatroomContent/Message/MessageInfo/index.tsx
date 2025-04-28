import { dayjs } from '@admin/shared/lib/dayjs';
import { MeatBallsMenuIcon } from '@admin/shared/components/Ui/Icon/MeatBallsMenuIcon';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import { isRead, MessageType } from '@admin/domain/chat/models/MessageType';
import { CompactModal } from '@admin/shared/components/Ui/Modal/CompactModalMenu';
import styles from './MessageInfo.module.css';
import { useOpenMenu } from './hooks/useOpenMenu';
import { useDeleteMessage } from './hooks/useDeleteMessage';

type Props = {
    isReceive: boolean;
    message: MessageType;
};
export const MessageInfo = ({ isReceive, message }: Props) => {
    const { handleOpenMenu, menuPosition, isOpenMenu, closeMenu } = useOpenMenu();
    const { handleDelete } = useDeleteMessage(message, closeMenu);

    return (
        <div className={`${styles.subInfo}`}>
            <div
                className={`${styles.subInfoTop} ${isReceive ? styles.flexStart : styles.flexEnd}`}
            >
                {!isReceive && (
                    <>
                        <div onClick={handleOpenMenu}>
                            <MeatBallsMenuIcon size={IconSize.md} />
                        </div>
                        <CompactModal
                            className={styles.messageMenu}
                            extraStyles={menuPosition}
                            menuItems={[{ label: '削除', onClick: handleDelete }]}
                            isOpen={isOpenMenu}
                            closeModal={closeMenu}
                        />
                    </>
                )}
            </div>

            <div
                className={`${styles.subInfoBottom} ${isReceive ? styles.flexStart : styles.flexEnd}`}
            >
                <Read isSend={!isReceive} isRead={isRead(message)} />
                <span>{dayjs(message.sendAt).format('MM/DD HH::mm')}</span>
            </div>
        </div>
    );
};

type ReadProps = {
    isSend: boolean;
    isRead: boolean;
};
const Read = ({ isSend, isRead }: ReadProps) => {
    return <span>{isSend && isRead && '既読'}</span>;
};
