import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { ContractSummary, OwnerAdmin } from '@admin/domain/contract/model';

type ContractDetailSummaryType = {
    contractSummary: ContractSummary;
    ownerAdmin: OwnerAdmin;
};
export const useContractDetailQuery = (contractId: string | undefined) => {
    const { data, isPending } = useQuery<ContractDetailSummaryType, AxiosError>({
        queryKey: queryKeys.contractDetail(Number(contractId)),
        queryFn: async () => {
            return await ApiEndpoint.systemAdmin.fetchContract(Number(contractId));
        },
        enabled: contractId !== undefined,
    });

    return { summary: data, isLoading: isPending };
};
