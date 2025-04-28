import { FormLabel } from '@admin/shared/components/Ui/Form/FormLabel';
import styles from './MediaPicker.module.css';
import { useMediaInput } from './useMediaInput';
import { Preview } from './Preview';
import formStyles from '../Form.module.css';
import { InitialImage } from './InitialImage';

type Props = {
    name: string;
    contentKey: string | number;
    mediaType: 'image' | 'video';
    onChange: (file: File | undefined) => void;
    label?: string;
    placeholder?: string;
    required?: boolean;
    initialImagePath?: string;
    size?: { width: number; height: number };
    className?: string;
    error?: {
        message?: string;
    };
};
export const MediaPicker = ({
    name,
    contentKey,
    mediaType = 'image',
    onChange,
    label = '',
    placeholder,
    required,
    initialImagePath,
    size,
    className,
    error,
}: Props) => {
    const {
        mediaInputRef,
        preview,
        media,
        initialImage,
        handleMediaChange,
        handleDrop,
        handleInputClear,
    } = useMediaInput(initialImagePath, onChange);
    const accept = mediaType === 'image' ? 'image/*' : '.mp4, .mov, .webm, .mkv';

    return (
        <div>
            {label !== '' && <FormLabel label={label} required={required} />}
            <div
                style={{ width: size?.width, height: size?.height }}
                className={`
                    ${styles.customFileUpload} ${className ?? ''}
                    ${error !== undefined ? formStyles.error : ''}
                    ${(preview !== undefined || initialImage !== undefined) && styles.previewBack}`}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                <input
                    name={name}
                    id={String(contentKey)}
                    ref={mediaInputRef}
                    className={styles.fileInput}
                    type="file"
                    accept={accept}
                    onChange={handleMediaChange}
                />
                <label
                    className={styles.customFileUploadLabel}
                    htmlFor={`${contentKey}`}
                    style={{ padding: preview !== undefined ? '0' : undefined }}
                >
                    {initialImage !== undefined ? (
                        <InitialImage src={initialImage} handleInputClear={handleInputClear} />
                    ) : preview !== undefined ? (
                        <Preview
                            media={media}
                            preview={preview}
                            handleInputClear={handleInputClear}
                        />
                    ) : (
                        <div className={styles.placeholder}>{placeholder}</div>
                    )}
                </label>
            </div>
            {error !== undefined && <p className={formStyles.errorMessage}>{error?.message}</p>}
        </div>
    );
};
