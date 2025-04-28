import { AdminRoles, AdminRoleType, Admin } from '@admin/domain/admin/model.ts';

// API取得データの変換用メソッド;
export type ProfileApiResource = {
    id: number;
    contractName: string;
    contractKey: string;
    role: string;
    firebaseLoginToken: string;
};
//NOTE: firestoreでのユーザー識別子 ChatroomMember.phpのtypePrefixIdと同じルールで統一
const typePrefixId = (id: number) => {
    return `staff_${id}`;
};
export const convertToAdmin = (resource: ProfileApiResource): Admin => {
    const roleIsValid = Object.values(AdminRoles).includes(resource.role as AdminRoleType);
    if (!roleIsValid) {
        throw new Error('管理者roleが一致しません。');
    }

    return {
        id: resource.id,
        typePrefixId: typePrefixId(resource.id),
        contractName: resource.contractName,
        contractKey: resource.contractKey,
        role: resource.role as AdminRoleType,
        firebaseLoginToken: resource.firebaseLoginToken,
    };
};
