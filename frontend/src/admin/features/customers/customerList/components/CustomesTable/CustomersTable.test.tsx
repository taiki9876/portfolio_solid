import { render, renderHook, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClientProvider } from '@admin/shared/components/Container/QueryClientProvider';
import { dummyCustomersResponse } from '@src/shared/msw/mocks/customers';
import { expect } from 'vitest';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { useCustomerStore } from '@admin/features/customers/state/useCustomerStore';
import { BrowserRouter } from 'react-router-dom';
import { CustomersTable } from './index';
import { header } from './header';

const MockComponent = () => {
    return (
        <QueryClientProvider>
            <BrowserRouter>
                <CustomersTable />
            </BrowserRouter>
        </QueryClientProvider>
    );
};
vi.mock(
    '@admin/features/customers/customerList/components/CustomesTable/hooks/useToDetailPage',
    () => ({
        useToDetailPage: vi.fn().mockImplementation(() => ({ toDetailPage: vi.fn() })),
    })
);
test('test_CustomersTable_情報が描画されること', async () => {
    //Given
    const fetchCustomersSpy = vi.spyOn(ApiEndpoint.customers, 'fetchCustomers');
    render(<MockComponent />);

    //When： 初期状態
    header.map((h) => {
        // Then: ヘッダーが描画されていること;
        screen.getByText(h.label);
    });
    //Then: placeholderが表示されていること
    const placeholder = screen.getByTestId('tableRow-placeholder-1');

    //When: データ取得を待つ
    expect(fetchCustomersSpy).toHaveBeenCalledTimes(1);
    await waitFor(() => {
        //Then: データが描画されていること
        expect(screen.queryByText(dummyCustomersResponse[0].name)).toBeInTheDocument();
        expect(placeholder).not.toBeInTheDocument();
    });

    //When: ページ番号をクリック
    const secondPageButton = screen.getByTestId('page-2');
    await userEvent.click(secondPageButton);
    expect(fetchCustomersSpy).toHaveBeenCalledTimes(2); //Then: データ取得が再度呼ばれていること

    //When: 件数を変更
    const perPageSelect = screen.getByTestId('per-page-select');
    await userEvent.selectOptions(perPageSelect, '50');
    expect(fetchCustomersSpy).toHaveBeenCalledTimes(3); //Then: データ取得が再度呼ばれていること

    //When: 検索ワードを変更
    renderHook(() => useCustomerStore.getState().setSearchWord('山田'));
    expect(fetchCustomersSpy).toHaveBeenCalledTimes(4); //Then: データ取得が再度呼ばれていること

    //When: APIキャッシュが有効であること
    await userEvent.click(secondPageButton);
    await userEvent.click(screen.getByTestId('page-1'));
    expect(fetchCustomersSpy).toHaveBeenCalledTimes(4); //Then: データ取得が呼ばれていないこと
});
