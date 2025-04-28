import { useNavigate, useParams } from 'react-router-dom';
import { resolvePath } from '@admin/routes/type';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { RowType } from '@admin/shared/components/Ui/Table/TableRow';

export const useToDetailPage = () => {
    const navigate = useNavigate();
    const { contractId } = useParams<{ contractId: string }>();

    const toDetailPage = (row: RowType) => {
        if (contractId === undefined) {
            return;
        }

        void navigate(
            resolvePath(SystemAdminRouteNames.shopDetail, {
                contractId: contractId,
                shopId: row.values[0] as string,
            })
        );
    };

    return { toDetailPage };
};
