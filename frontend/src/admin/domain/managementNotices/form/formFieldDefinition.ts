import { FormInputType } from '@admin/shared/lib/reactHookForm/components/InputField';
import { ContractApp, toContractAppString } from '@admin/domain/contract/model';
import { rules, ManagementNoticeFormValues } from './formValue';

export const inputFields: FormInputType<ManagementNoticeFormValues>[] = [
    {
        label: '件名',
        placeholder: 'メンテナンスのお知らせ',
        name: 'title',
        isRequired: true,
        rules: rules.title,
        formType: 'text',
    },
    {
        label: '本文',
        placeholder: '⚪︎月⚪︎日にメンテナンスを実施します。',
        name: 'content',
        isRequired: true,
        rules: rules.content,
        formType: 'textarea',
        textAreaOptions: {
            rows: 4,
        },
    },
    {
        label: '掲載日時',
        placeholder: '掲載日を選択',
        name: 'publishedAt',
        isRequired: true,
        rules: rules.publishedAt,
        formType: 'datetime',
        datetimeOptions: {
            withTime: true,
        },
    },
    {
        label: '掲載終了日時',
        placeholder: '掲載日を選択',
        name: 'unpublishedAt',
        isRequired: false,
        rules: rules.unpublishedAt,
        formType: 'datetime',
        datetimeOptions: {
            withTime: true,
        },
    },
    {
        label: '公開許可(強制的に非公開にできます)',
        name: 'isPublished',
        isRequired: true,
        rules: rules.isPublished,
        formType: 'radio',
        radioOptions: {
            options: [
                { value: 'true', label: '許可' },
                { value: 'false', label: '非公開' },
            ],
        },
    },
    {
        label: 'アプリタイプで掲載先を絞る',
        name: 'contractAppType',
        isRequired: false,
        rules: rules.contractAppType,
        formType: 'radio',
        radioOptions: {
            options: [
                { value: '', label: '指定なし' },
                {
                    value: String(ContractApp.lineApp),
                    label: toContractAppString(ContractApp.lineApp),
                },
                {
                    value: String(ContractApp.nativeApp),
                    label: toContractAppString(ContractApp.nativeApp),
                },
            ],
        },
    },
];
