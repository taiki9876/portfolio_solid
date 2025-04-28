import { convertToAdmin } from '@admin/domain/admin/transform';
import { AdminRoles } from '@admin/domain/admin/model';

test.each([
    {
        id: 1,
        contractName: 'カフェ大吉',
        contractKey: 'test',
        role: AdminRoles.supportAdmin,
        firebaseLoginToken: '',
    },
    {
        id: 1,
        contractName: 'カフェ大吉',
        contractKey: 'test',
        role: AdminRoles.storeOwner,
        firebaseLoginToken: '',
    },
    {
        id: 1,
        contractName: 'カフェ大吉',
        contractKey: 'test',
        role: AdminRoles.branchOwner,
        firebaseLoginToken: '',
    },
])(
    'test_convertToAdmin_正しく変換できること',
    ({ id, contractName, contractKey, role, firebaseLoginToken }) => {
        expect(
            convertToAdmin({
                id,
                contractName,
                contractKey,
                role,
                firebaseLoginToken,
            })
        ).toEqual({
            id,
            typePrefixId: `staff_${id}`,
            contractName,
            contractKey,
            role,
            firebaseLoginToken,
        });
    }
);

test('test_convertToAdmin_不正なデータの場合例外がでること', () => {
    expect(() =>
        convertToAdmin({
            id: 1,
            contractName: 'test',
            contractKey: 'test',
            role: 'invalidRole',
            firebaseLoginToken: '',
        })
    ).toThrow('管理者roleが一致しません。');
});
