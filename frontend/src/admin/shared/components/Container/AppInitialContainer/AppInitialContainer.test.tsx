import { render, screen, waitFor } from '@testing-library/react';
import { AppInitialContainer } from '@admin/shared/components/Container/AppInitialContainer';
import { useAuthStore } from '@admin/shared/state/globalState';
import { server } from '@src/shared/msw/server';
import { http, HttpResponse } from 'msw';
import { authAPiPath } from '@admin/shared/api/context/auth';
import { AdminRoles } from '@admin/domain/admin/model';

// 初期化処理の挙動を追うためのダミーコンポーネント
const DummyComponent = () => {
    const { admin } = useAuthStore(); //ログイン管理者の情報
    return <div data-testid="role">{admin?.role}</div>;
};
test('test_ApplicationContainer_アプリケーション初期化を正しく行うこと', async () => {
    //Given
    server.use(
        http.get(authAPiPath.fetchProfile, () => {
            return HttpResponse.json({ role: AdminRoles.staff });
        })
    );
    render(
        <AppInitialContainer>
            <DummyComponent />
        </AppInitialContainer>
    );

    //Then
    await waitFor(() => {
        const role = screen.getByTestId('role');
        expect(role.textContent).toBe(AdminRoles.staff);
    });
});
