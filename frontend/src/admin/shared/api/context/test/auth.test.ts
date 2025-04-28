import { authAPi, authAPiPath } from '@admin/shared/api/context/auth';
import { http, HttpResponse } from 'msw';
import { AdminRoles } from '@admin/domain/admin/model';
import { server } from '@src/shared/msw/server';
import { describe } from 'vitest';
import * as networkUtil from '@admin/shared/util/networkUtil';

describe('test_fetchProfile', () => {
    test('ログイン中の管理者ユーザーを正しく取得できること', async () => {
        //Given
        const expected = {
            id: 1,
            typePrefixId: `staff_1`,
            contractKey: 'some-test',
            role: AdminRoles.staff,
        };
        server.use(
            http.get(authAPiPath.fetchProfile, () => {
                return HttpResponse.json({
                    id: 1,
                    contractKey: 'some-test',
                    role: AdminRoles.staff,
                });
            })
        );
        //When
        const result = await authAPi.fetchProfile();
        //Then
        expect(result).toEqual(expected);
    });

    test('APIレスポンスの戻り値が想定しないものの場合例外が起きること', async () => {
        //Given
        server.use(
            http.get(authAPiPath.fetchProfile, () => {
                return HttpResponse.json({ someProperty: 'something went wrong' });
            })
        );
        //Then
        await expect(authAPi.fetchProfile()).rejects.toThrow('管理者roleが一致しません。');
    });
});

test('ログアウトされること。正しくリダイレクトされること', async () => {
    //Given
    server.use(http.post(authAPiPath.logout, () => new HttpResponse(undefined, { status: 204 })));
    const redirectToSpy = vi.spyOn(networkUtil, 'redirectTo').mockImplementation(() => {});
    //When
    await authAPi.logout();
    //Then
    expect(redirectToSpy).toHaveBeenCalledWith(networkUtil.RedirectPath.loginPage);
});
