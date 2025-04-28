import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';
import { Table } from '@admin/shared/components/Ui/Table';
import { Pagination } from '@admin/shared/components/Ui/Pagination';
import { formatDate } from '@admin/shared/util/dateUtil';
import { RowType } from '@admin/shared/components/Ui/Table/TableRow';
import { ManagementNotice } from '@admin/domain/managementNotices/model';
import { useOpenNotice } from '@admin/shared/components/Ui/Modal/NoticeModal/useOpenNotice';
import { header } from './header';
import { useSearchManagementNotices } from './hooks/useSearchManagementNotices';

export const ManagementNoticesTable = () => {
    const { managementNotices, isLoading, paginationMeta, setPageMeta } =
        useSearchManagementNotices();
    const { handleOpenNotice } = useOpenNotice();

    return (
        <SectionContainer shouldPadding={false}>
            <Table
                tableKey="managementNotices"
                headers={header}
                rows={createRows(managementNotices)}
                isLoading={isLoading}
                onRowClick={(row) => {
                    const noticeId = row.id;
                    const target = managementNotices.find((notice) => notice.id === noticeId);
                    if (target === undefined) {
                        return;
                    }

                    handleOpenNotice(
                        target.title,
                        target.content,
                        formatDate(target.publishedAt, { withTime: true, withWeekday: true })
                    );
                }}
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

const createRows = (managementNotices: ManagementNotice[]): RowType[] => {
    return managementNotices.map((notice) => ({
        id: notice.id,
        values: [notice.title, formatDate(notice.publishedAt, { withTime: true })],
    }));
};
