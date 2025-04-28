import { RedirectPath, redirectTo } from '@admin/shared/util/networkUtil.ts';

export const NotFoundPage = () => {
    redirectTo(RedirectPath.notFound);
    return <p>404 Not Found...</p>;
};
