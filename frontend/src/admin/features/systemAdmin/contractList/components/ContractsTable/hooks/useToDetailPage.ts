import { useNavigate } from 'react-router-dom';
import { resolvePath } from '@admin/routes/type';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { RowType } from '@admin/shared/components/Ui/Table/TableRow';

export const useToDetailPage = () => {
    const navigate = useNavigate();

    const toDetailPage = (row: RowType) => {
        void navigate(
            resolvePath(SystemAdminRouteNames.contractDetail, {
                contractId: row.values[0] as string,
            })
        );
    };

    return { toDetailPage };
};
