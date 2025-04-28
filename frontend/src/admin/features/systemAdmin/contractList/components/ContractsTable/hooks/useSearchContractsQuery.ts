import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { useSystemAdminStore } from '@admin/features/systemAdmin/shared/systemAdminStore';
import { RowType } from '@admin/shared/components/Ui/Table/TableRow';

type SearchContractsCash = {
    contracts: RowType[];
};
export const useSearchContractsQuery = () => {
    const conditions = useSystemAdminStore((state) => state.contractSearchConditions);

    const { data, isPending } = useQuery<SearchContractsCash, AxiosError>({
        queryKey: queryKeys.searchContracts(conditions.word),
        queryFn: async () => {
            const contracts = await ApiEndpoint.systemAdmin.fetchContracts(conditions.word);
            return {
                contracts: contracts.map((contract) => ({
                    id: contract.id,
                    values: Object.values(contract),
                })),
            };
        },
        enabled: true,
        placeholderData: keepPreviousData,
    });

    return {
        contracts: data === undefined ? [] : data.contracts,
        isLoading: isPending,
    };
};
