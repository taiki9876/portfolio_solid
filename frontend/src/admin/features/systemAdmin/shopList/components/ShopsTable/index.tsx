import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';
import { Table } from '@admin/shared/components/Ui/Table';
import { headers } from './header';
import { useSearchShopsQuery } from './hooks/useSearchShopsQuery';
import { useToDetailPage } from './hooks/useToDetailPage';

export const ShopsTable = () => {
    const { shops, isLoading } = useSearchShopsQuery();
    const { toDetailPage } = useToDetailPage();

    return (
        <SectionContainer shouldPadding={false}>
            <Table
                tableKey="shopsTable"
                headers={headers}
                rows={shops}
                isLoading={isLoading}
                onRowClick={toDetailPage}
            />
        </SectionContainer>
    );
};
