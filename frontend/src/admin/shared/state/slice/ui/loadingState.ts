import { StateCreator } from 'zustand';

export type LoadingStateStore = {
    isLoading: boolean;
    toggleLoading: (isLoading: boolean, message?: string) => void;
    loadingMessage: string | undefined;
};

export const createLoadingStateSlice: StateCreator<LoadingStateStore, [], [], LoadingStateStore> = (
    set
) => ({
    isLoading: false,
    toggleLoading: (isLoading, message?: string) => {
        if (isLoading === false) {
            set({ isLoading, loadingMessage: undefined });
            return;
        }
        set({ isLoading, loadingMessage: message });
    },
    loadingMessage: undefined,
});
