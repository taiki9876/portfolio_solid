import { render, screen, act } from '@testing-library/react';
import { useModalStore } from '@admin/shared/state/globalState';
import { ModalWithStore } from '@admin/shared/components/Ui/Modal/index';

//テスト用のstate操作用のコンポーネント
const Handler = () => {
    const { openModal } = useModalStore();
    return (
        <div>
            <button
                data-testid="toOpen"
                onClick={() => openModal({ title: 'モーダルてすと', renderBody: () => null })}
            >
                open
            </button>
        </div>
    );
};
test('test_ModalWithStore_stateの状態によってモーダル表示が切り替わること', () => {
    render(
        <>
            <ModalWithStore />
            <Handler />
        </>
    );

    // 初期状態では表示されない
    expect(screen.queryByTestId('modal-component')).toBeNull();

    // 表示
    act(() => {
        screen.getByTestId('toOpen').click();
    });
    expect(screen.queryByTestId('modal-component')).not.toBeNull();

    // 閉じる
    act(() => {
        screen.getByTestId('modal-component-close').click();
    });
    expect(screen.queryByTestId('modal-component')).toBeNull();
});
