import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';
import { Table } from '@admin/shared/components/Ui/Table';
import { Pagination } from '@admin/shared/components/Ui/Pagination';
import { useSearchCustomerQuery } from './hooks/useSearchCustomerQuery';
import { header } from './header';
import { useToDetailPage } from './hooks/useToDetailPage';

export const CustomersTable = () => {
    const { customers, isLoading, paginationMeta, setPageMeta } = useSearchCustomerQuery();
    const { toDetailPage } = useToDetailPage();

    return (
        <SectionContainer shouldPadding={false}>
            <Table
                tableKey="customerTable"
                headers={header}
                rows={customers}
                onRowClick={toDetailPage}
                isLoading={isLoading}
                needColumnSelector={true}
            />

            <Pagination
                totalItemCount={paginationMeta.total}
                perPage={{
                    value: paginationMeta.perPage,
                    onPerPageChange: (perPage: number) => {
                        setPageMeta({ page: 1, perPage });
                    },
                }}
                paging={{
                    currentPage: paginationMeta.page,
                    onPageChange: (page: number) => setPageMeta({ page }),
                }}
            />
        </SectionContainer>
    );
};
