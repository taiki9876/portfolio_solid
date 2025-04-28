import { useCallback, useRef, useState } from 'react';

export const useToast = (duration: number, onClose: () => void) => {
    const visibleTImerId = useRef<NodeJS.Timeout | undefined>(undefined);
    const cleanupTimerId = useRef<NodeJS.Timeout | undefined>(undefined);
    const [isVisible, setIsVisible] = useState(false);

    const clearTimer = useCallback(() => {
        if (visibleTImerId.current !== undefined) {
            clearTimeout(visibleTImerId.current);
            visibleTImerId.current = undefined;
        }
        if (cleanupTimerId.current !== undefined) {
            clearTimeout(cleanupTimerId.current);
            cleanupTimerId.current = undefined;
        }
    }, []);

    const closeToast = useCallback(() => {
        if (onClose !== undefined) {
            onClose();
        }
    }, [onClose]);

    const startTimer = useCallback(() => {
        setIsVisible(true);

        visibleTImerId.current = setTimeout(() => setIsVisible(false), duration);
        cleanupTimerId.current = setTimeout(() => closeToast(), duration + 500); // アニメーションのために少し待つ
    }, [duration, closeToast]);

    return {
        clearTimer,
        startTimer,
        isVisible,
    };
};
