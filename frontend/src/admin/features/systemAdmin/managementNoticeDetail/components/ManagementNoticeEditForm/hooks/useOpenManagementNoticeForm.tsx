import { useEffect } from 'react';
import { useModalStore } from '@admin/shared/state/globalState';
import { useForm } from 'react-hook-form';
import { isDeepEqual } from '@admin/shared/util/objectUtil';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { AdminManagementNotice } from '@admin/domain/managementNotices/model';
import { ManagementNoticeFormValues } from '@admin/domain/managementNotices/form/formValue';
import { useManagementNoticeDefaultValue } from './useManagementNoticeDefaultValue';
import { ManagementNoticeEditForm } from '../index';

const formId = 'managementNoticeEditForm';
export const useOpenManagementNoticeForm = (notice: AdminManagementNotice) => {
    const { defaultValues } = useManagementNoticeDefaultValue(notice);
    const { openModal } = useModalStore();
    const { noticeId } = useParams<{ noticeId: string }>();
    const queryClient = useQueryClient();

    const { control, reset, clearErrors, getValues } = useForm<ManagementNoticeFormValues>({
        defaultValues: defaultValues,
    });

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    const _resetInput = (withQueryCacheClear: boolean = false) => {
        reset(defaultValues);
        clearErrors();
        if (withQueryCacheClear) {
            void queryClient.invalidateQueries({
                queryKey: queryKeys.managementNoticesDetail(Number(noticeId)),
                exact: true,
            });

            void queryClient.invalidateQueries({
                queryKey: [queryKeys.fetchManagementNotices('')[0]],
                exact: false,
            });
        }
    };

    const handleOpenContractForm = () => {
        openModal({
            title: '運営からのお知らせの編集',
            formId: formId,
            onOk: {
                label: '保存する',
            },
            onCancel: {
                label: 'キャンセル',
            },
            onCloseHookAction: () => {
                const currentValues = getValues();
                if (isDeepEqual(currentValues, defaultValues)) {
                    _resetInput();
                    return true;
                }

                if (confirm('変更内容は保存されていません。\n破棄して閉じてもよろしいですか？')) {
                    _resetInput();
                    return true;
                }

                return false;
            },
            widthSize: 'medium',
            renderBody: () => (
                <ManagementNoticeEditForm
                    formId={formId}
                    noticeId={Number(noticeId)}
                    control={control}
                    resetInput={_resetInput}
                />
            ),
        });
    };

    return {
        handleOpenContractForm,
    };
};
