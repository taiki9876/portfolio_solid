import { render, screen, act, waitFor } from '@testing-library/react';
import { useToastNotificationStore } from '@admin/shared/state/globalState';
import { ToastWithStore } from '@admin/shared/components/Ui/Toast/index';
import { afterEach } from 'vitest';

beforeEach(() => {
    vi.useFakeTimers({
        shouldAdvanceTime: true,
    });
});
afterEach(() => {
    vi.clearAllTimers();
});

//テスト用のstate操作用のコンポーネント
const Handler = () => {
    const { notify } = useToastNotificationStore();
    return (
        <div>
            <button data-testid="toOpen" onClick={() => notify('トースト通知テスト', 'info', 6000)}>
                notify
            </button>
        </div>
    );
};
test('test_ToastWithStore_stateの状態によってトースト通知が切り替わること', async () => {
    render(
        <>
            <ToastWithStore />
            <Handler />
        </>
    );

    // 初期状態では表示されない
    expect(screen.queryByTestId('toast-component')).toBeNull();

    // 表示
    act(() => {
        screen.getByTestId('toOpen').click();
    });
    expect(screen.queryByTestId('toast-component')).not.toBeNull();

    // 指定された時間後に自動で非表示
    act(() => {
        vi.advanceTimersByTime(6000);
    });
    await waitFor(() => {
        expect(screen.queryByTestId('toast-component')).toBeNull();
    });
});
