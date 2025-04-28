import { Toast } from '@admin/shared/components/Ui/Toast/Base';
import { useToastNotificationStore } from '@admin/shared/state/globalState';

export const ToastWithStore = () => {
    const { message, type, duration, close } = useToastNotificationStore();

    return <Toast message={message} type={type} duration={duration} onClose={close} />;
};
