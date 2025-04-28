import { TextButton } from '@admin/shared/components/Ui/Button/TextButton';
import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import { useTextCache } from './hooks/useTextCache';
import { useTextareaAutoSize } from './hooks/useTextareaAutoSize';
import { useSendMessage } from './hooks/useSendMessage';
import styles from './TextForm.module.css';

export const TextForm = () => {
    const currentChatroom = useInquiryStore((state) => state.currentChatroom);

    const { text, handleChange, clearInput } = useTextCache(currentChatroom);
    const { textareaRef } = useTextareaAutoSize(text);
    const { handleSendMessage, handleKeyDown } = useSendMessage(text, currentChatroom, clearInput);

    return (
        <>
            <div className={styles.inputContainer}>
                <textarea
                    rows={1}
                    ref={textareaRef}
                    value={text}
                    onChange={handleChange}
                    className={styles.textarea}
                    onKeyDown={handleKeyDown}
                    placeholder="メッセージを入力"
                />
            </div>
            <div className={styles.sendContainer} onClick={handleSendMessage}>
                <TextButton label="送信" variant="primary" />
            </div>
        </>
    );
};
