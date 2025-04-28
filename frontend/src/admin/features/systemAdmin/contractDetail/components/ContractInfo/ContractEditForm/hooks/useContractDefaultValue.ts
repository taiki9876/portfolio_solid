import { useEffect, useState } from 'react';
import { ContractEditFormValues } from '@admin/domain/contract/form/formValue';
import { ContractSummary } from '@admin/domain/contract/model';

export const useContractDefaultValue = (summary: ContractSummary) => {
    const [defaultValues, setDefaultValues] = useState<ContractEditFormValues>({
        contractName: summary.name,
        contractKey: summary.key,
        contractKeyAlias: summary.keyAlias,
        industry: summary.industry ?? '',
        personInCharge: summary.personInCharge ?? '',
        email: summary.email ?? '',
        tel: summary.tel ?? '',
        memo: summary.memo ?? '',
        contractStatus: String(summary.contractStatus),
        contractAppType: String(summary.contractAppType),
    });
    useEffect(() => {
        setDefaultValues({
            contractName: summary.name,
            contractKey: summary.key,
            contractKeyAlias: summary.keyAlias,
            industry: summary.industry ?? '',
            personInCharge: summary.personInCharge ?? '',
            email: summary.email ?? '',
            tel: summary.tel ?? '',
            memo: summary.memo ?? '',
            contractStatus: String(summary.contractStatus),
            contractAppType: String(summary.contractAppType),
        });
    }, [summary]);

    return { defaultValues };
};
