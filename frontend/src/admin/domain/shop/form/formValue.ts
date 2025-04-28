import { Validation } from '@admin/shared/lib/reactHookForm/validation';
import { ShopImage } from '@admin/domain/shop/model';

export type ShopFormValues = {
    name: string;
    appDisplayName: string;
    'images[0]': File | ShopImage | undefined;
    'images[1]': File | ShopImage | undefined;
    'images[2]': File | ShopImage | undefined;
    'images[3]': File | ShopImage | undefined;
    'images[4]': File | ShopImage | undefined;
    businessHours: string;
    rest: string;
    tel: string;
    address: string;
    prelusion: string;
    hpUrl: string;
    mapUrl: string;
};

export const defaultValues: ShopFormValues = {
    name: '',
    appDisplayName: '',
    'images[0]': undefined,
    'images[1]': undefined,
    'images[2]': undefined,
    'images[3]': undefined,
    'images[4]': undefined,
    businessHours: '',
    rest: '',
    tel: '',
    address: '',
    prelusion: '',
    hpUrl: '',
    mapUrl: '',
};

// ------------ validate rules -------------
export const rules = {
    name: {
        required: Validation.required(),
        maxLength: Validation.maxLength(200),
    },
    appDisplayName: {
        maxLength: Validation.maxLength(200),
    },
    image: {
        validate: {
            lessThan10MB: (fileList: unknown) =>
                Validation.validate.lessThan10MB((fileList as FileList)?.[0]),
            imageFile: (fileList: unknown) =>
                Validation.validate.imageFile((fileList as FileList)?.[0]),
        },
    },
    businessHours: {
        maxLength: Validation.maxLength(250),
    },
    rest: {
        maxLength: Validation.maxLength(250),
    },
    tel: {
        maxLength: Validation.maxLength(200),
    },
    address: {
        maxLength: Validation.maxLength(250),
    },
    prelusion: {
        maxLength: Validation.maxLength(2000),
    },
    hpUrl: {
        maxLength: Validation.maxLength(250),
        pattern: Validation.pattern.url(),
    },
    mapUrl: {
        maxLength: Validation.maxLength(250),
        pattern: Validation.pattern.url(),
    },
};
