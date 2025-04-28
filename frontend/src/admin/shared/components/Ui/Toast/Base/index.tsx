import { useEffect } from 'react';
import { Z_INDEX_TOAST } from '@admin/constants';
import { CrossIcon } from '@admin/shared/components/Ui/Icon/CrossIcon';
import { ToastType } from '@admin/shared/state/slice/ui/toastState';
import { Colors } from '@admin/assets/styles/colors';
import { useToast } from './useToast';
import styles from './BaseToast.module.css';

type Props = {
    message: string;
    type?: ToastType;
    onClose?: () => void;
    duration?: number;
};
export const Toast = ({ message, type = 'info', onClose = () => {}, duration = 6000 }: Props) => {
    const { clearTimer, startTimer, isVisible } = useToast(duration, onClose);

    useEffect(() => {
        clearTimer();

        if (message !== '') {
            startTimer();
        }

        return () => clearTimer();
    }, [startTimer, clearTimer, message]);

    if (message === '') {
        return null;
    }

    return (
        <div
            data-testid="toast-component"
            className={`${styles.container} ${styles[type]}`}
            style={{
                zIndex: Z_INDEX_TOAST,
                transform: isVisible ? 'translateY(0)' : 'translateY(120%)',
                opacity: isVisible ? 1 : 0,
            }}
        >
            <span>{message}</span>
            <CrossIcon onClick={onClose} color={Colors.white} />
        </div>
    );
};
