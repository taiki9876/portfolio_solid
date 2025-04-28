import { ChangeEvent, useRef, useState } from 'react';
import { isValidMedia } from '@src/shared/validation/mediaValidator';

export const useMediaInput = () => {
    const mediaInputRef = useRef<HTMLInputElement>(null);
    const [media, setMedia] = useState<File | undefined>(undefined);
    const [preview, setPreview] = useState<string | undefined>(undefined);

    const handleMediaChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputFile = event.target.files?.[0];

        if (inputFile === undefined || !isValidMedia(inputFile)) {
            handleInputClear();
            return;
        }

        if (inputFile.type.startsWith('image/') || inputFile.type.startsWith('video/')) {
            setPreview(URL.createObjectURL(inputFile));
            setMedia(inputFile);
        } else {
            alert('画像または動画ファイルを選択してください');
            handleInputClear();
        }
    };

    const handleInputClear = () => {
        setPreview(undefined);
        setMedia(undefined);
        if (mediaInputRef.current !== null) {
            mediaInputRef.current.value = '';
        }
    };

    return {
        mediaInputRef,
        media,
        preview,
        handleMediaChange,
        handleInputClear,
    };
};
