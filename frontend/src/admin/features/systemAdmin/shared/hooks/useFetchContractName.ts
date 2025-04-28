import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';

export const useFetchContractName = (contractId: string | undefined) => {
    const { data, isPending } = useQuery<string, AxiosError>({
        queryKey: queryKeys.contractName(Number(contractId)),
        queryFn: async () => {
            return await ApiEndpoint.systemAdmin.fetchContractName(Number(contractId));
        },
        enabled: contractId !== undefined,
    });

    return { contractName: data, isLoading: isPending };
};
