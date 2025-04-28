import { PlusIcon } from '@admin/shared/components/Ui/Icon/PlusIcon';
import { ActionButton } from '@admin/shared/components/Ui/Button/ActionButton';
import { useNavigate, useParams } from 'react-router-dom';
import { resolvePath } from '@admin/routes/type';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';

export const ToCreatePage = () => {
    const navigate = useNavigate();
    const { contractId } = useParams<{ contractId: string }>();
    const toCreateForm = () => {
        if (contractId === undefined) {
            return;
        }
        void navigate(resolvePath(SystemAdminRouteNames.shopCreate, { contractId: contractId }));
    };

    return <ActionButton label="店舗を追加" onClick={toCreateForm} icon={PlusIcon} />;
};
