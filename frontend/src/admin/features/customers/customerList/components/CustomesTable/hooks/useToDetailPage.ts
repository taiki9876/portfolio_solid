import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@admin/routes/routes';
import { resolvePath } from '@admin/routes/type';
import { RowType } from '@admin/shared/components/Ui/Table/TableRow';

export const useToDetailPage = () => {
    const navigate = useNavigate();

    const toDetailPage = (row: RowType) => {
        void navigate(
            resolvePath(RouteNames.customerDetail, { customerCode: row.values[0] as string })
        );
    };

    return { toDetailPage };
};
