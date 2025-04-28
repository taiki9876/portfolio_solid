import ChatroomImg from '@admin/assets/images/chatroom.png';
import styles from './DefaultChatScreen.module.css';

export const DefaultChatScreen = () => {
    return (
        <div className={styles.defaultScreen}>
            <p className={styles.greeting}>問い合わせチャットへようこそ</p>
            <p className={styles.description}>(チャットしたいアカウントを選択してください)</p>
            <img src={ChatroomImg} />
        </div>
    );
};
