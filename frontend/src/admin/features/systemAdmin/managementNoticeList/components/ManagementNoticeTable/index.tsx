import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';
import { Table } from '@admin/shared/components/Ui/Table';
import { useNavigate } from 'react-router-dom';
import { resolvePath } from '@admin/routes/type';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { createRows, headers } from './header';
import { useSearchManagementNoticesQuery } from './hooks/useSearchManagementNoticesQuery';

export const ManagementNoticeTable = () => {
    const { notices, isLoading } = useSearchManagementNoticesQuery();
    const navigate = useNavigate();

    return (
        <SectionContainer shouldPadding={false}>
            <Table
                tableKey="contractsTable"
                headers={headers}
                rows={createRows(notices)}
                isLoading={isLoading}
                onRowClick={(row) => {
                    const noticeId = row.id;
                    const target = notices.find((notice) => notice.id === noticeId);
                    if (target === undefined) {
                        return;
                    }

                    void navigate(
                        resolvePath(SystemAdminRouteNames.managementNoticeDetail, {
                            noticeId: String(target.id),
                        })
                    );
                }}
            />
        </SectionContainer>
    );
};
