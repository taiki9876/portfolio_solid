import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';
import { Table } from '@admin/shared/components/Ui/Table';
import { headers } from './header';
import { useSearchContractsQuery } from './hooks/useSearchContractsQuery';
import { useToDetailPage } from './hooks/useToDetailPage';

export const ContractsTable = () => {
    const { contracts, isLoading } = useSearchContractsQuery();
    const { toDetailPage } = useToDetailPage();

    return (
        <SectionContainer shouldPadding={false}>
            <Table
                tableKey="contractsTable"
                headers={headers}
                rows={contracts}
                isLoading={isLoading}
                onRowClick={toDetailPage}
            />
        </SectionContainer>
    );
};
