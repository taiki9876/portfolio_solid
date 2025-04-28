import { useEffect, useRef, useState } from 'react';
import { Z_INDEX_INITIAL_SCREEN } from '@admin/constants';
import styles from './InitialScreen.module.css';

type Props = {
    isInitCompleted: boolean;
};
export const InitialScreen = ({ isInitCompleted }: Props) => {
    const screenRef = useRef<HTMLDivElement>(null);
    const [hidden, setHidden] = useState(false);

    const handleAnimationEnd = () => setHidden(true);
    useEffect(() => {
        const screen = screenRef.current;
        if (isInitCompleted && screen !== null) {
            screen.addEventListener('animationend', handleAnimationEnd);

            return () => {
                screen.removeEventListener('animationend', handleAnimationEnd);
            };
        }
    }, [isInitCompleted]);

    if (hidden) {
        return null;
    }

    return (
        <div
            ref={screenRef}
            className={`${styles.container} ${isInitCompleted ? styles.animation : ''}`}
            style={{ zIndex: Z_INDEX_INITIAL_SCREEN }}
        />
    );
};
