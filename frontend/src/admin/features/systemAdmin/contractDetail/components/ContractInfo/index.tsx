import { SectionTitle } from '@admin/shared/components/Ui/DetailComponents/SectionTitle';
import {
    InfoItemRow,
    InfoItemType,
} from '@admin/shared/components/Ui/DetailComponents/InfoItemRow';
import {
    ContractAppType,
    ContractStatusType,
    ContractSummary,
    toContractAppString,
    toContractStatusString,
} from '@admin/domain/contract/model';
import { useOpenContractForm } from './ContractEditForm/hooks/useOpenContractForm';

type Props = {
    summary: ContractSummary;
};
export const ContractInfo = ({ summary }: Props) => {
    const { handleOpenContractForm } = useOpenContractForm(summary);

    return (
        <>
            <SectionTitle
                title="契約情報"
                onEdit={{ label: '編集', onClick: handleOpenContractForm }}
            />
            <div>
                {convertContractSummary(summary).map((info) => {
                    return <InfoItemRow key={info.key} columns={[info]} labelWidth={110} />;
                })}
            </div>
        </>
    );
};

// ラベルとキーの対応表
const contractLabels: { [K in keyof ContractSummary]?: string } = {
    name: '名前',
    key: 'キー',
    keyAlias: '短縮キー',
    contractAppType: 'アプリタイプ',
    industry: '業種',
    personInCharge: '担当者名',
    tel: '担当電話番号',
    email: 'メールアドレス',
    memo: 'メモ',
    contractStatus: '契約状態',
    customerCount: '会員数',
    shopCount: '店舗数',
};

// 変換関数
const convertContractSummary = (contract: ContractSummary): InfoItemType[] => {
    return Object.keys(contractLabels).map((key) => {
        let val = contract[key as keyof ContractSummary] ?? '';

        if (key === 'contractStatus') {
            val = toContractStatusString(val as ContractStatusType);
        }
        if (key === 'contractAppType') {
            val = toContractAppString(val as ContractAppType);
        }

        return {
            key,
            label: contractLabels[key as keyof ContractSummary]!,
            value: val,
        };
    });
};
