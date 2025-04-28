import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import { isValidMedia } from '@src/shared/validation/mediaValidator';

export const useMediaInput = (
    initialImagePath: string | undefined,
    onChange: (file: File | undefined) => void
) => {
    const mediaInputRef = useRef<HTMLInputElement>(null);
    const [media, setMedia] = useState<File | undefined>(undefined);
    const [preview, setPreview] = useState<string | undefined>(undefined);
    const [initialImage, setInitialImage] = useState<string | undefined>(initialImagePath);

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        const dropFile = event.dataTransfer.files?.[0];
        _processFile(dropFile);
    };

    const handleMediaChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputFile = event.target.files?.[0];
        _processFile(inputFile);
    };

    const _processFile = (file: File | undefined) => {
        if (file === undefined || !isValidMedia(file)) {
            handleInputClear();
            return;
        }

        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            setPreview(URL.createObjectURL(file));
            setMedia(file);
            onChange(file);
            setInitialImage(undefined);
        } else {
            alert('画像または動画ファイルを選択してください');
            handleInputClear();
        }
    };

    const handleInputClear = () => {
        setPreview(undefined);
        setMedia(undefined);
        setInitialImage(undefined);
        onChange(undefined);
        if (mediaInputRef.current !== null) {
            mediaInputRef.current.value = '';
        }
    };

    return {
        mediaInputRef,
        media,
        preview,
        initialImage,
        handleMediaChange,
        handleDrop,
        handleInputClear,
    };
};
