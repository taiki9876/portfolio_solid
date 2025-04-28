import { FormInputType } from '@admin/shared/lib/reactHookForm/components/InputField';
import {
    ContractApp,
    ContractStatus,
    toContractAppString,
    toContractStatusString,
} from '@admin/domain/contract/model';
import { ContractCreateFormValues, ContractEditFormValues, rules } from './formValue';

//---- 契約情報の入力項目
export const inputOfContract: FormInputType<ContractCreateFormValues | ContractEditFormValues>[] = [
    {
        label: '名前（企業名・個人名）',
        placeholder: '株式会社〇〇',
        name: 'contractName',
        isRequired: true,
        rules: rules.contractName,
        formType: 'text',
    },
    {
        label: 'キー(英字・数字・ハイフン)、後で変更できません',
        placeholder: 'owl-hair',
        name: 'contractKey',
        isRequired: true,
        rules: rules.contractKey,
        formType: 'text',
        editableOptions: {
            isEditable: false,
        },
    },
    {
        label: '短縮キー(システム内部で利用される内部文字列)5文字まで、後で変更できません',
        placeholder: 'oh',
        name: 'contractKeyAlias',
        isRequired: true,
        rules: rules.contractKeyAlias,
        formType: 'text',
        editableOptions: {
            isEditable: false,
        },
    },
    {
        label: 'アプリタイプ',
        name: 'contractAppType',
        isRequired: true,
        rules: rules.contractAppType,
        formType: 'radio',
        radioOptions: {
            options: [
                {
                    label: toContractAppString(ContractApp.lineApp),
                    value: String(ContractApp.lineApp),
                },
                {
                    label: toContractAppString(ContractApp.nativeApp),
                    value: String(ContractApp.nativeApp),
                },
            ],
        },
    },
    {
        label: '業種',
        placeholder: 'サービス業',
        name: 'industry',
        isRequired: false,
        rules: rules.industry,
        formType: 'text',
    },
];

// ---- 担当者情報の入力項目
export const inputOfInCharge: FormInputType<ContractCreateFormValues | ContractEditFormValues>[] = [
    {
        label: '担当者様名',
        placeholder: '田中 太郎',
        name: 'personInCharge',
        isRequired: false,
        rules: rules.personInCharge,
        formType: 'text',
    },
    {
        label: '担当者様電話番号',
        placeholder: '00-0000-0000',
        name: 'tel',
        isRequired: false,
        rules: rules.tel,
        formType: 'text',
    },
    {
        label: '担当者様メールアドレス',
        placeholder: 'owlsolution@example.com',
        name: 'email',
        isRequired: false,
        rules: rules.email,
        formType: 'text',
    },
];

//その他
export const inputOfAdditional: FormInputType<ContractCreateFormValues | ContractEditFormValues>[] =
    [
        {
            placeholder: '',
            name: 'memo',
            isRequired: false,
            rules: rules.memo,
            formType: 'textarea',
            editableOptions: {
                label: 'メモ',
            },
            textAreaOptions: {
                rows: 4,
            },
        },
        {
            label: '契約ステータス (無効にすると管理者はログインできなくなります)',
            name: 'contractStatus',
            isRequired: true,
            rules: rules.contractStatus,
            formType: 'radio',
            radioOptions: {
                options: [
                    {
                        label: toContractStatusString(ContractStatus.active),
                        value: String(ContractStatus.active),
                    },
                    {
                        label: toContractStatusString(ContractStatus.inactive),
                        value: String(ContractStatus.inactive),
                    },
                ],
            },
            isEditFormOnly: true,
        },
    ];

//-- 管理者アカウント
export const inputOfAdmin: FormInputType<ContractCreateFormValues | ContractEditFormValues>[] = [
    {
        label: 'ログインID',
        placeholder: 'owl-hair',
        name: 'adminLoginId',
        isRequired: true,
        rules: rules.adminLoginId,
        editableOptions: {
            isEditable: false,
        },
        formType: 'text',
    },
    {
        label: '初期パスワード',
        placeholder: '********',
        name: 'adminPassword',
        isRequired: true,
        rules: rules.adminPassword,
        editableOptions: {
            isEditable: false,
        },
        formType: 'text',
    },
];
