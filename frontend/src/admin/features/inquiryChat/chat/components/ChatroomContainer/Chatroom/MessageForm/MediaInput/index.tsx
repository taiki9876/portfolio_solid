import { PaperClipIcon } from '@admin/shared/components/Ui/Icon/PaperClipIcon';
import { Colors } from '@admin/assets/styles/colors';
import { useModalStore } from '@admin/shared/state/globalState';
import { CrossIcon } from '@admin/shared/components/Ui/Icon/CrossIcon';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import { ChatroomType } from '@admin/domain/chat/models/ChatroomType';
import { MessageContentMediaType } from '@admin/domain/chat/models/MessageType';
import { useMediaInput } from './hooks/useMediaInput';
import { useMediaUpload } from './hooks/useMediaUpload';
import { useSendMediaMessage } from './hooks/useSendMediaMessage';
import styles from './MediaInput.module.css';

const formId = 'photoInput';
export const MediaInput = () => {
    const { openModal, closeModal } = useModalStore();
    const currentChatroom = useInquiryStore((state) => state.currentChatroom);
    const { handelSendPhotoMessage } = useSendMediaMessage(currentChatroom, closeModal);

    const handleOpenForm = () => {
        openModal({
            formId: formId,
            hasRequiredLabel: false,
            title: '画像を選択',
            onCancel: undefined,
            onOk: {
                label: '送信',
            },
            renderBody: () => (
                <MediaInputForm
                    currentChatroom={currentChatroom!}
                    onUploadSuccess={handelSendPhotoMessage}
                />
            ),
        });
    };

    return (
        <div className={styles.additionalContainer}>
            <PaperClipIcon color={Colors.primary} onClick={handleOpenForm} />
        </div>
    );
};

type Props = {
    currentChatroom: ChatroomType;
    onUploadSuccess: (uploadImagePath: string, mediaType: MessageContentMediaType) => Promise<void>;
};
const MediaInputForm = ({ currentChatroom, onUploadSuccess }: Props) => {
    const { mediaInputRef, media, preview, handleMediaChange, handleInputClear } = useMediaInput();
    const { handleUploadMedia } = useMediaUpload(currentChatroom, media, onUploadSuccess);

    return (
        <form
            id={formId}
            className={styles.fileInputContainer}
            onSubmit={handleUploadMedia}
            method="post"
        >
            {preview !== undefined && (
                <div className={styles.previewContainer}>
                    {media?.type.startsWith('image/') === true ? (
                        <img src={preview} alt="preview" className={styles.previewImage} />
                    ) : media?.type.startsWith('video/') === true ? (
                        <video src={preview} className={styles.previewVideo} controls />
                    ) : null}
                    <div className={styles.previewClose}>
                        <CrossIcon onClick={handleInputClear} size={IconSize.md} />
                    </div>
                </div>
            )}
            <input
                ref={mediaInputRef}
                className={styles.fileInput}
                type="file"
                accept="image/*, .mp4, .mov, .webm, .mkv"
                onChange={handleMediaChange}
            />
        </form>
    );
};
