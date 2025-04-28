import { useEffect } from 'react';
import { useModalStore } from '@admin/shared/state/globalState';
import { useForm } from 'react-hook-form';
import { isDeepEqual } from '@admin/shared/util/objectUtil';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { ShopFormValues } from '@admin/domain/shop/form/formValue';
import { Shop } from '@admin/domain/shop/model';
import { ShopEditForm } from '../index';
import { useShopDefaultValue } from './useShopDefaultValue';

const formId = 'shopEditForm';
export const useOpenShopForm = (shop: Shop) => {
    const { defaultValues } = useShopDefaultValue(shop);
    const { openModal } = useModalStore();
    const { contractId, shopId } = useParams<{ contractId: string; shopId: string }>();
    const queryClient = useQueryClient();

    const { control, reset, clearErrors, getValues } = useForm<ShopFormValues>({
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
                queryKey: queryKeys.shopDetail(Number(contractId), Number(shopId)),
                exact: true,
            });

            void queryClient.invalidateQueries({
                queryKey: [queryKeys.searchShops(0, '')[0]],
                exact: false,
            });
        }
    };

    const handleOpenContractForm = () => {
        openModal({
            title: '店舗情報の編集',
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
                <ShopEditForm
                    formId={formId}
                    contractId={Number(contractId)}
                    shop={shop}
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
