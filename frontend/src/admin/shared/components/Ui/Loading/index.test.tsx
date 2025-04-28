import { render, screen, act } from '@testing-library/react';
import { LoadingWithStore } from '@admin/shared/components/Ui/Loading/index';
import { expect } from 'vitest';
import { useLoadingStore } from '@admin/shared/state/globalState';

//テスト用のstate操作用のコンポーネント
const Handler = () => {
    const { toggleLoading } = useLoadingStore();
    return (
        <div>
            <button data-testid="toOpen" onClick={() => toggleLoading(true, '処理中です')}>
                show
            </button>
            <button data-testid="toClose" onClick={() => toggleLoading(false)}>
                hide
            </button>
        </div>
    );
};
test('test_LoadingWithStore_stateの状態によってローディング表示が切り替わること', () => {
    render(
        <>
            <LoadingWithStore />
            <Handler />
        </>
    );

    // 初期状態ではローディングは表示されない
    expect(screen.queryByTestId('loading-component')).toBeNull();

    // ローディングを表示
    act(() => {
        screen.getByTestId('toOpen').click();
    });
    expect(screen.queryByTestId('loading-component')).not.toBeNull();

    // ローディングを解除
    act(() => {
        screen.getByTestId('toClose').click();
    });
    expect(screen.queryByTestId('loading-component')).toBeNull();
});
