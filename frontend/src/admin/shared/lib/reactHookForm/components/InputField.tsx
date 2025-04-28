import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import {
    DatePicker,
    RadioButtonGroup,
    TextArea,
    TextInput,
} from '@admin/shared/components/Ui/Form';
import { ButtonOptionType } from '@admin/shared/components/Ui/Form/RadioButtonGroup';
import { formatDate, now, updateDate, updateTime } from '@admin/shared/util/dateUtil';
import { MediaPicker } from '@admin/shared/components/Ui/Form/MediaPicker';

export type FormType = 'text' | 'textarea' | 'radio' | 'datetime' | 'image';
export type FormInputType<T extends FieldValues> = {
    name: Path<T>;
    isRequired: boolean;
    formType: FormType;
    isEditable?: boolean;
    isEditFormOnly?: boolean; //modeがeditの時のみ表示される
    label?: string;
    placeholder?: string;
    rules?: Partial<RegisterOptions<T, Path<T>>>;
    textAreaOptions?: {
        //formTypeがtextareaの時に有効になる設定
        rows?: number;
    };
    radioOptions?: {
        //formTypeがradioの時に有効になる設定
        options: ButtonOptionType[];
    };
    imageOptions?: {
        //formTypeがimageの時に有効になる設定
        contentKey: string;
        size: {
            width: number;
            height: number;
        };
        initialImagePath?: string;
    };
    datetimeOptions?: {
        //formTypeがdatetimeの時に有効になる設定
        withTime: boolean;
    };
    editableOptions?: {
        //modeがeditの時に有効になる設定
        label?: string;
        placeholder?: string;
        rules?: Partial<RegisterOptions<T, Path<T>>>;
        isEditable?: boolean;
    };
};

type Props<T extends FieldValues> = {
    input: FormInputType<T>;
    control: Control<T>;
    mode?: 'create' | 'edit';
};
export const InputField = <T extends FieldValues>({
    input,
    control,
    mode = 'create',
}: Props<T>) => {
    const setting = optionalSetting<T>(mode, input);

    if (input.isEditFormOnly == true && mode === 'create') {
        return null;
    }

    return (
        <Controller
            name={input.name}
            control={control}
            rules={setting.rules}
            render={({ field, fieldState }) => {
                if (input.formType === 'textarea') {
                    return (
                        <TextArea
                            label={setting.label}
                            placeholder={setting.placeholder}
                            value={field.value}
                            onChange={field.onChange}
                            required={input.isRequired}
                            error={fieldState.error}
                            rows={input?.textAreaOptions?.rows ?? 2}
                            disabled={setting.isEditable === false}
                        />
                    );
                }

                if (input.formType === 'radio') {
                    return (
                        <RadioButtonGroup
                            required={input.isRequired}
                            groupName={input.name}
                            label={input.label}
                            value={String(field.value)}
                            options={input.radioOptions?.options ?? []}
                            changeValue={field.onChange}
                            error={fieldState.error}
                        />
                    );
                }

                if (input.formType === 'image') {
                    return (
                        <MediaPicker
                            name={input.name}
                            contentKey={input.imageOptions?.contentKey ?? 'contentKey'}
                            mediaType="image"
                            onChange={(file: File | undefined) => field.onChange(file)}
                            label={input.label}
                            placeholder={input.placeholder}
                            required={input.isRequired}
                            initialImagePath={input.imageOptions?.initialImagePath}
                            size={input?.imageOptions?.size}
                            error={fieldState.error}
                        />
                    );
                }

                if (input.formType === 'datetime') {
                    return (
                        <DatePicker
                            label={input.label}
                            required={input.isRequired}
                            onReset={() => field.onChange(undefined)}
                            value={field.value}
                            onDateChange={(newDate: string) => {
                                const currentDate = field.value === '' ? now() : field.value;
                                field.onChange(
                                    formatDate(updateDate(currentDate, newDate), { withTime: true })
                                );
                            }}
                            withTime={true}
                            onTimeChange={(
                                hour: string | undefined,
                                minute: string | undefined
                            ) => {
                                const currentDate = field.value === '' ? now() : field.value;
                                field.onChange(
                                    formatDate(updateTime(currentDate, hour, minute), {
                                        withTime: true,
                                    })
                                );
                            }}
                            placeholder={input.placeholder}
                            error={fieldState.error}
                        />
                    );
                }

                //TextInput
                return (
                    <TextInput
                        label={input.label}
                        placeholder={input.placeholder}
                        value={field.value}
                        onChange={field.onChange}
                        required={input.isRequired}
                        disabled={setting.isEditable === false}
                        error={fieldState.error}
                    />
                );
            }}
        />
    );
};

const optionalSetting = <T extends FieldValues>(
    mode: 'create' | 'edit',
    input: FormInputType<T> & { editableOptions?: Partial<FormInputType<T>> }
) => {
    if (mode === 'edit' && input.editableOptions !== undefined) {
        return {
            label: input.editableOptions?.label ?? input.label,
            placeholder: input.editableOptions?.placeholder ?? input.placeholder,
            rules: input.editableOptions?.rules ?? input.rules,
            isEditable: input.editableOptions?.isEditable ?? input.isEditable,
        };
    }

    return {
        label: input.label,
        placeholder: input.placeholder,
        rules: input.rules,
        isEditable: input.isEditable,
    };
};
