import { ReactNode } from 'react';
import { StateCreator } from 'zustand';

export type ModalContent = {
    title?: string;
    formId?: string;
    hasRequiredLabel?: boolean;
    onCloseHookAction?: () => boolean;
    verticalCenter?: boolean;
    onOk?: {
        label: string;
        action?: () => void;
    };
    onCancel?: {
        label: string;
        action?: () => void;
    };
    renderBody: () => ReactNode | null;
    widthSize?: 'medium' | 'large';
};

export type ModalStateStore = {
    isOpen: boolean;
    modalContent: ModalContent;

    closeModal: () => void;
    openModal: (props: ModalContent) => void;
};

export const createModalStateSlice: StateCreator<ModalStateStore, [], [], ModalStateStore> = (
    set
) => ({
    isOpen: false,
    modalContent: {
        renderBody: () => null,
    },

    closeModal: () => {
        set({ isOpen: false });
    },
    openModal: (props: ModalContent) => {
        set({ modalContent: props, isOpen: true });
    },
});
