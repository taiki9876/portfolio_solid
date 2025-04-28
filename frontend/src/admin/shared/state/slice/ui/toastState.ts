import { StateCreator } from 'zustand';

// トースト通知管理store
export type ToastType = 'error' | 'info';
export type ToastStateStore = {
    message: string;
    type: ToastType;
    duration: number | undefined;
    isVisible: boolean;
    notify: (message: string, type?: ToastType, duration?: number) => void;
    close: () => void;
};
const defaultDuration = 4500;

export const createToastStateSlice: StateCreator<ToastStateStore, [], [], ToastStateStore> = (
    set
) => ({
    message: '',
    type: 'info',
    duration: defaultDuration,
    isVisible: false,

    notify: (message: string, type: ToastType = 'info', duration: number = defaultDuration) => {
        set({
            message,
            type,
            duration,
            isVisible: true,
        });
    },
    close: () => {
        set({
            message: '',
            type: 'info',
            duration: defaultDuration,
            isVisible: false,
        });
    },
});
