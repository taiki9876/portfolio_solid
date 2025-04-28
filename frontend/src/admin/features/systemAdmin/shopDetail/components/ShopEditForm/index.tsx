import { Control } from 'react-hook-form';
import { useErrorHandler } from '@admin/shared/lib/reactHookForm/useErrorHandler';
import { ErrorBox } from '@admin/shared/components/Ui/Form/ErrorBox';
import { Row } from '@admin/shared/components/Ui/Form/ModalForm/Row';
import { ShopFormValues } from '@admin/domain/shop/form/formValue';
import {
    inputOfShopForApp,
    inputOfShopForAppImage,
    inputOfShopInfo,
} from '@admin/domain/shop/form/formFieldDefinition';
import { InputField } from '@admin/shared/lib/reactHookForm/components/InputField';
import { usePreventEnterSubmit } from '@src/shared/hooks/usePreventEnterSubmit';
import { FlexStart } from '@admin/shared/components/Layout/FlexBox/FlexStart';
import { THUMBNAIL_SIZE_16_9 } from '@admin/constants';
import { Shop, ShopImage } from '@admin/domain/shop/model';
import { useEditShop } from './hooks/useEditShop';

type Props = {
    formId: string;
    contractId: number;
    shop: Shop;
    control: Control<ShopFormValues>;
    resetInput: (withQueryCacheClear: boolean) => void;
};
export const ShopEditForm = ({ formId, contractId, shop, control, resetInput }: Props) => {
    const { apexMarker, hasError, onInputError, toggleError } = useErrorHandler();
    const { handleEditShop } = useEditShop(contractId, shop.id, control, toggleError);
    const onKeyDown = usePreventEnterSubmit();

    const onSubmit = (data: ShopFormValues) => {
        void handleEditShop(data, () => resetInput(true));
    };

    return (
        <>
            <div ref={apexMarker} />
            {hasError && <ErrorBox messages={['入力内容を再度ご確認ください。']} />}
            <form
                id={formId}
                onSubmit={control.handleSubmit(onSubmit, onInputError)}
                onKeyDown={onKeyDown}
            >
                {[...inputOfShopInfo, ...inputOfShopForApp].map((input) => {
                    if (input.name === 'images[0]') {
                        return (
                            <ImageList key="imageList" shopImages={shop.images} control={control} />
                        );
                    }
                    return (
                        <Row key={input.name}>
                            <InputField
                                key={input.name}
                                input={input}
                                control={control}
                                mode="edit"
                            />
                        </Row>
                    );
                })}
            </form>
        </>
    );
};

type ImageListProps = {
    shopImages: ShopImage[];
    control: Control<ShopFormValues>;
};
const ImageList = ({ shopImages, control }: ImageListProps) => {
    return (
        <Row key="imageList">
            <FlexStart>
                {inputOfShopForAppImage.map((imageInput, index) => {
                    return (
                        <InputField
                            key={imageInput.name}
                            input={{
                                ...imageInput,
                                imageOptions: {
                                    contentKey: imageInput.name,
                                    size: THUMBNAIL_SIZE_16_9,
                                    initialImagePath: shopImages[index]?.path ?? undefined,
                                },
                            }}
                            control={control}
                            mode="edit"
                        />
                    );
                })}
            </FlexStart>
        </Row>
    );
};
