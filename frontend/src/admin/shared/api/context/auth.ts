import { apiClient } from '@admin/shared/lib/axios';
import { ADMIN_API_ENDPOINT } from '@admin/env';
import { RedirectPath, redirectTo, responseOk } from '@admin/shared/util/networkUtil';
import { Admin } from '@admin/domain/admin/model';
import { convertToAdmin, ProfileApiResource } from '@admin/domain/admin/transform';

export const authAPiPath = {
    fetchProfile: `${ADMIN_API_ENDPOINT}/profile`,
    logout: `${ADMIN_API_ENDPOINT}/logout`,
};

export const authAPi = {
    fetchProfile: async (): Promise<Admin> => {
        const res = await apiClient.get<ProfileApiResource>(authAPiPath.fetchProfile);
        if (responseOk(res.status)) {
            return convertToAdmin(res.data);
        }

        throw new Error('管理者情報の取得に失敗しました。');
    },
    logout: async () => {
        const res = await apiClient.post(authAPiPath.logout);
        if (responseOk(res.status)) {
            redirectTo(RedirectPath.loginPage);
            return true;
        }

        return false;
    },
} as const;
