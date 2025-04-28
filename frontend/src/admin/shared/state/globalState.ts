import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { AuthStore, createAuthSlice } from '@admin/shared/state/slice/app/authStore';
import {
    createLoadingStateSlice,
    LoadingStateStore,
} from '@admin/shared/state/slice/ui/loadingState';
import {
    BreadcrumbStore,
    createBreadcrumbStoreSlice,
} from '@admin/shared/state/slice/ui/breadcrumbStore';
import { createModalStateSlice, ModalStateStore } from '@admin/shared/state/slice/ui/ModalState';
import { createToastStateSlice, ToastStateStore } from '@admin/shared/state/slice/ui/toastState';

type UiStore = LoadingStateStore & BreadcrumbStore & ModalStateStore & ToastStateStore;
type ApplicationStore = AuthStore;
export type GlobalStore = UiStore & ApplicationStore;

// グローバルストアの作成。スライスを追加する場合はここに追加する
export const slices = [
    createAuthSlice,
    createLoadingStateSlice,
    createBreadcrumbStoreSlice,
    createModalStateSlice,
    createToastStateSlice,
];
const RootStore = create<GlobalStore>()((...args) => {
    const createdSlices = slices.map((createSlice) => createSlice(...args));
    return Object.assign({}, ...createdSlices) as GlobalStore;
});

// Application -----
// ログイン中の管理者
export const useAuthStore = (): AuthStore => {
    return RootStore(
        useShallow(({ admin, loadProfile, isAdminLoaded }) => ({
            admin,
            loadProfile,
            isAdminLoaded,
        }))
    );
};

//UI -----
// ローディングの状態
export const useLoadingStore = (): LoadingStateStore => {
    return RootStore(
        useShallow(({ isLoading, toggleLoading, loadingMessage }) => ({
            isLoading,
            toggleLoading,
            loadingMessage,
        }))
    );
};
// パンくずリスト
export const useBreadcrumbStore = (): BreadcrumbStore => {
    return RootStore(
        useShallow(({ routeNames, setBreadcrumb }) => ({
            routeNames,
            setBreadcrumb,
        }))
    );
};

// モーダル
export const useModalStore = (): ModalStateStore => {
    return RootStore(
        useShallow(({ isOpen, closeModal, openModal, modalContent }) => ({
            isOpen,
            closeModal,
            openModal,
            modalContent,
        }))
    );
};

// トースト通知Store
export const useToastNotificationStore = (): ToastStateStore => {
    return RootStore(
        useShallow(({ message, type, duration, isVisible, notify, close }) => ({
            message,
            type,
            duration,
            isVisible,
            notify,
            close,
        }))
    );
};
