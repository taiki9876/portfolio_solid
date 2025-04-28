import { ReactNode } from 'react';
import { Z_INDEX_MODAL } from '@admin/constants';
import { CrossIcon } from '@admin/shared/components/Ui/Icon/CrossIcon';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import { TextButton } from '@admin/shared/components/Ui/Button/TextButton';
import { RequiredMark } from '@admin/shared/components/Ui/Form/FormLabel/RequiredMark';
import styles from './Modal.module.css';

type Props = {
    isOpen: boolean;
    title?: string;
    onClose?: () => void;
    onCloseHookAction?: () => boolean; //falseを返したら閉じない
    onOk?: {
        label: string;
        action?: () => void;
    };
    onCancel?: {
        label: string;
        action?: () => void;
    };
    formId?: string;
    hasRequiredLabel?: boolean;
    widthSize?: 'medium' | 'large';
    verticalCenter?: boolean;
    backgroundOpacity?: number;
    children: ReactNode;
};
export const Modal = ({
    isOpen = false,
    title,
    onClose,
    onCloseHookAction,
    onCancel,
    onOk,
    formId,
    hasRequiredLabel = true,
    verticalCenter,
    backgroundOpacity,
    widthSize,
    children,
}: Props) => {
    const hasAction = onCancel !== undefined || onOk !== undefined;

    const calcWidthSize = () => {
        if (widthSize === 'medium') {
            return '600px';
        }
        if (widthSize === 'large') {
            return '800px';
        }
        return 'auto';
    };

    if (!isOpen) {
        return null;
    }

    const handleClose = () => {
        let canClose = true;
        if (onCloseHookAction !== undefined) {
            canClose = onCloseHookAction();
        }
        if (onClose !== undefined && canClose) {
            onClose();
        }
    };

    return (
        <ModalBackground
            onClose={handleClose}
            opacity={backgroundOpacity}
            verticalCenter={verticalCenter}
        >
            <div
                className={styles.modalContainer}
                style={{ zIndex: Z_INDEX_MODAL, width: calcWidthSize() }}
            >
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>{title}</h2>
                    <div className={styles.modalHeaderRight}>
                        {formId !== undefined && hasRequiredLabel && (
                            <span>
                                (<RequiredMark />
                                )必須項目
                            </span>
                        )}
                        {onClose !== undefined && (
                            <CrossIcon size={IconSize.md} onClick={handleClose} />
                        )}
                    </div>
                </div>

                <div className={styles.modalBody}>{children}</div>

                {hasAction && (
                    <div className={styles.modalFooter}>
                        {onCancel !== undefined && (
                            <TextButton
                                label={onCancel.label}
                                onClick={onCancel.action ?? handleClose}
                                variant="outline"
                            />
                        )}
                        {onOk !== undefined && (
                            <TextButton
                                label={onOk.label}
                                onClick={onOk.action ?? undefined}
                                variant="primary"
                                formId={formId}
                            />
                        )}
                    </div>
                )}
            </div>
        </ModalBackground>
    );
};

// モーダルの背景を提供するコンポーネント
type BackgroundProps = {
    onClose?: () => void;
    opacity?: number;
    verticalCenter?: boolean;
    children?: ReactNode;
};
export const ModalBackground = ({
    onClose,
    verticalCenter = true,
    opacity = 0.6,
    children,
}: BackgroundProps) => {
    return (
        <div
            data-testid="modal-component"
            className={`${styles.container} ${verticalCenter && styles.verticalCenter}`}
            style={{ zIndex: Z_INDEX_MODAL }}
        >
            <PressableBackground onClose={onClose} opacity={opacity} />
            {children !== undefined && children}
        </div>
    );
};

type PressableBackgroundProps = {
    onClose?: () => void;
    opacity?: number;
};
export const PressableBackground = ({ onClose, opacity }: PressableBackgroundProps) => {
    return (
        <div
            data-testid="modal-component-close"
            className={styles.layerShadow}
            style={{ opacity, zIndex: Z_INDEX_MODAL }}
            onClick={onClose}
        />
    );
};
