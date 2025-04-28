import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from './index';

import { dummyOptions } from './Dropdown.stories';

describe('test_Dropdown', () => {
    const DropdownWithState = () => {
        const [selectedValue, setSelectedValue] = useState<string>(dummyOptions[0].value);
        return (
            <Dropdown
                options={dummyOptions}
                selectedValue={selectedValue}
                onChange={(value: string) => setSelectedValue(value)}
            />
        );
    };
    test('正しい選択操作ができること', async () => {
        //Given
        render(<DropdownWithState />);
        const select: HTMLInputElement = screen.getByRole('combobox');

        // When: 初期値
        expect(select.value).toBe(dummyOptions[0].value);

        // When: 2番目の選択肢を選択
        await userEvent.selectOptions(select, dummyOptions[1].value);
        expect(select.value).toBe(dummyOptions[1].value); // Then: 2番目の選択肢が選択されていること

        // 3番目の選択肢を選択
        await userEvent.selectOptions(select, dummyOptions[2].value);
        expect(select.value).toBe(dummyOptions[2].value); // Then: 3番目の選択肢が選択されていること

        // 再び2番目の選択肢を選択
        await userEvent.selectOptions(select, dummyOptions[1].value);
        expect(select.value).toBe(dummyOptions[1].value); // Then: 2番目の選択肢が選択されていること
    });
});
