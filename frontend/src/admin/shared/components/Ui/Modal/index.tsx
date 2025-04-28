import { useModalStore } from '@admin/shared/state/globalState';
import { Modal } from '@admin/shared/components/Ui/Modal/BaseModal';

export const ModalWithStore = () => {
    const { isOpen, closeModal, modalContent } = useModalStore();

    return (
        <Modal
            isOpen={isOpen}
            onClose={closeModal}
            onCloseHookAction={modalContent.onCloseHookAction}
            title={modalContent.title}
            formId={modalContent.formId}
            hasRequiredLabel={modalContent.hasRequiredLabel}
            onCancel={modalContent.onCancel}
            onOk={modalContent.onOk}
            widthSize={modalContent.widthSize}
            verticalCenter={modalContent.verticalCenter}
        >
            {modalContent.renderBody()}
        </Modal>
    );
};
