import { StateCreator } from 'zustand';
import { Admin } from '@admin/domain/admin/model';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';

export type AuthStore = {
    admin: Admin | undefined;
    isAdminLoaded: boolean;
    loadProfile: () => Promise<void>;
};

export const createAuthSlice: StateCreator<AuthStore, [], [], AuthStore> = (set) => ({
    admin: undefined,
    isAdminLoaded: false,
    loadProfile: async () => {
        const loggedInAdmin = await ApiEndpoint.auth.fetchProfile();
        set({ isAdminLoaded: true });
        set({ admin: loggedInAdmin });
    },
});
