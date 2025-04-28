import { useEffect, useRef } from 'react';

export const useTextareaAutoSize = (text: string) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (textareaRef.current !== null) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    return {
        textareaRef,
    };
};
