import { useNavigate } from 'react-router-dom';
import { route } from '@admin/routes/type';
import { SystemAdminRouteNames } from '@admin/routes/routesSystemAdmin';
import { ActionButton } from '@admin/shared/components/Ui/Button/ActionButton';
import { PlusIcon } from '@admin/shared/components/Ui/Icon/PlusIcon';

export const ToCreateForm = () => {
    const navigate = useNavigate();
    const toCreateForm = () => {
        void navigate(route(SystemAdminRouteNames.contractCreate).path);
    };

    return <ActionButton label="契約を追加" onClick={toCreateForm} icon={PlusIcon} />;
};
