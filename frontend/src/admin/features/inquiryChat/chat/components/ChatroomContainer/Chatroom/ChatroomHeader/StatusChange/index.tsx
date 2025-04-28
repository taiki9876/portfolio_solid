import { CheckIcon } from '@admin/shared/components/Ui/Icon/CheckIcon';
import { Colors } from '@admin/assets/styles/colors';
import styles from '../ChatroomHeader.module.css';
import { useChangeStatus } from './useChangeStatus';

export const StatusChange = () => {
    const { handleMarkProcessed, handleMarkSpam, chatroomStatus } = useChangeStatus();

    return (
        <>
            <div
                className={`
                  ${styles.button}
                  ${chatroomStatus.isSpam && styles.noChange}
                  ${chatroomStatus.isProcessed && !chatroomStatus.isSpam && styles.active}
                `}
                onClick={handleMarkProcessed}
            >
                {!chatroomStatus.isSpam && (
                    <CheckIcon
                        isOn={chatroomStatus.isProcessed}
                        color={chatroomStatus.isProcessed ? Colors.primary : Colors.gray400}
                    />
                )}
                対応済み
            </div>
            <div
                className={`${styles.button} ${chatroomStatus.isSpam && styles.activeSpam}`}
                onClick={handleMarkSpam}
            >
                <CheckIcon
                    isOn={chatroomStatus.isSpam}
                    color={chatroomStatus.isSpam ? Colors.red : Colors.gray400}
                />
                スパム
            </div>
        </>
    );
};
