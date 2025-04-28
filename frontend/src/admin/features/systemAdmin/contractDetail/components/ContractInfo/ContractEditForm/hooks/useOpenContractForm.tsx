import { useEffect } from 'react';
import { useModalStore } from '@admin/shared/state/globalState';
import { useForm } from 'react-hook-form';
import { ContractEditFormValues } from '@admin/domain/contract/form/formValue';
import { isDeepEqual } from '@admin/shared/util/objectUtil';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { ContractSummary } from '@admin/domain/contract/model';
import { useContractDefaultValue } from './useContractDefaultValue';
import { ContractEditForm } from '../index';

const formId = 'contractEditForm';
export const useOpenContractForm = (summary: ContractSummary) => {
    const { defaultValues } = useContractDefaultValue(summary);
    const { openModal } = useModalStore();
    const { contractId } = useParams<{ contractId: string }>();
    const queryClient = useQueryClient();

    const { control, reset, clearErrors, getValues } = useForm<ContractEditFormValues>({
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
                queryKey: queryKeys.contractDetail(Number(contractId)),
                exact: true,
            });
            void queryClient.invalidateQueries({
                queryKey: queryKeys.contractName(Number(contractId)),
                exact: true,
            });

            void queryClient.invalidateQueries({
                queryKey: [queryKeys.searchContracts('')[0]],
                exact: false,
            });
        }
    };

    const handleOpenContractForm = () => {
        openModal({
            title: '契約情報の編集',
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
                <ContractEditForm
                    formId={formId}
                    contractId={Number(contractId)}
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
