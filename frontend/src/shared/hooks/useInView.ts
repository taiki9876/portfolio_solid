import { useEffect, useRef, useState } from 'react';

/**
 * 画面内に表示されているかどうかを判定するカスタムフック
 */
type Props = {
    options?: IntersectionObserverInit;
};
export const useInView = ({ options }: Props = { options: {} }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isIn, setIsIn] = useState(false);

    const resetInView = () => {
        setIsIn(false);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIn(entry.isIntersecting);
            },
            {
                threshold: 0.1,
                ...options,
            }
        );

        const area = elementRef.current;
        if (area != null) {
            observer.observe(area);
        }

        return () => {
            if (area !== null) {
                observer.unobserve(area); // 監視解除
            }
        };
    }, [options]);

    return {
        ref: elementRef,
        isIn,
        resetInView,
    };
};
