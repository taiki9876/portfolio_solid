import { Admin, AdminRoles, isSupportAdmin, isSystemAdmin } from '@admin/domain/admin/model';

test('test_isSystemAdmin_システム管理者の場合trueが返ること', () => {
    const admin: Admin = {
        id: 1,
        typePrefixId: 'staff_1',
        contractName: 'test',
        contractKey: 'test',
        role: AdminRoles.systemAdmin,
        firebaseLoginToken: '',
    };
    expect(isSystemAdmin(admin)).toBe(true);

    const admin2: Admin = {
        id: 1,
        typePrefixId: 'staff_1',
        contractName: 'test',
        contractKey: 'test',
        role: AdminRoles.supportAdmin,
        firebaseLoginToken: '',
    };
    expect(isSystemAdmin(admin2)).toBe(false);
});

test('test_isSupportAdmin_サポートの場合trueが返ること', () => {
    const admin: Admin = {
        id: 1,
        typePrefixId: 'staff_1',
        contractName: 'test',
        contractKey: 'test',
        role: AdminRoles.systemAdmin,
        firebaseLoginToken: '',
    };
    expect(isSupportAdmin(admin)).toBe(false);

    const admin2: Admin = {
        id: 1,
        typePrefixId: 'staff_1',
        contractName: 'test',
        contractKey: 'test',
        role: AdminRoles.supportAdmin,
        firebaseLoginToken: '',
    };
    expect(isSupportAdmin(admin2)).toBe(true);
});
