import { useModalStore } from '@admin/shared/state/globalState';
import { useForm } from 'react-hook-form';
import {
    ManagementNoticeFormValues,
    defaultValues,
} from '@admin/domain/managementNotices/form/formValue';
import { useNavigate } from 'react-router-dom';
import { resolvePath } from '@admin/routes/type';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { CreateManagementNoticeForm } from './index';

const managementNoticeFormId = 'managementNoticeForm';
export const useOpenManagementNoticeForm = () => {
    const { openModal, closeModal } = useModalStore();
    const navigate = useNavigate();
    const { control, reset, clearErrors } = useForm<ManagementNoticeFormValues>({
        defaultValues,
    });

    const handleCustomerCreateModalOpen = () => {
        openModal({
            title: '運営からのお知らせ登録',
            formId: managementNoticeFormId,
            onOk: {
                label: '登録する',
            },
            onCancel: {
                label: 'キャンセル',
            },
            widthSize: 'medium',
            renderBody: () => (
                <CreateManagementNoticeForm
                    formId={managementNoticeFormId}
                    control={control}
                    onCreateEnd={(noticeId: number) => {
                        reset();
                        clearErrors();
                        closeModal();
                        void navigate(
                            resolvePath(SystemAdminRouteNames.managementNoticeDetail, {
                                noticeId: String(noticeId),
                            })
                        );
                    }}
                />
            ),
        });
    };

    return {
        handleCustomerCreateModalOpen,
    };
};
