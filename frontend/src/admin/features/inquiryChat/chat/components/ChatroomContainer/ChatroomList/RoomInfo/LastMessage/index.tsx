import styles from '../RoomInfo.module.css';

type Props = {
    lastMessage: string | null;
};
export const LastMessage = ({ lastMessage }: Props) => {
    if (lastMessage === null) {
        return null;
    }
    return <span className={styles.lastMessage}>{lastMessage}</span>;
};
