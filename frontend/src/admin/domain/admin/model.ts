export type Admin = {
    id: number;
    typePrefixId: string;
    contractName: string;
    contractKey: string;
    role: AdminRoleType;
    firebaseLoginToken: string;
};

// -- Value Types --
export const AdminRoles = {
    systemAdmin: 'systemAdmin',
    supportAdmin: 'supportAdmin',
    storeOwner: 'storeOwner',
    branchOwner: 'branchOwner',
    staff: 'staff',
} as const;
export type AdminRoleType = (typeof AdminRoles)[keyof typeof AdminRoles];

// --Functions--
export const canChat = (admin: Admin | undefined): boolean => {
    if (admin?.role === AdminRoles.systemAdmin || admin?.role === AdminRoles.supportAdmin) {
        return false;
    }

    return true;
};

export const isSystemAdmin = (admin: Admin | undefined): boolean => {
    return admin?.role === AdminRoles.systemAdmin;
};

export const isSupportAdmin = (admin: Admin | undefined): boolean => {
    return admin?.role === AdminRoles.supportAdmin;
};
export const isStoreAdmin = (admin: Admin | undefined): boolean => {
    return admin?.role === AdminRoles.storeOwner;
};
