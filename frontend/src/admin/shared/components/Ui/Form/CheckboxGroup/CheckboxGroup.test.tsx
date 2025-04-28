import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckboxGroup } from '@admin/shared/components/Ui/Form/CheckboxGroup/index';
import { dummyOptions } from './CheckboxGroup.stories';

describe('test_CheckboxGroup', () => {
    const CheckboxGroupWithState = () => {
        const [selectedValues, setSelectedValues] = useState<string[]>([]);
        return (
            <CheckboxGroup
                groupName="example"
                selectedValues={selectedValues}
                options={dummyOptions}
                onChange={(selectedValues: string[]) => setSelectedValues(selectedValues)}
                flexDirection="row"
            />
        );
    };
    test('正しい操作ができること', async () => {
        //Given
        render(<CheckboxGroupWithState />);

        const checkbox1: HTMLInputElement = screen.getByLabelText(dummyOptions[0].label);
        const checkbox2: HTMLInputElement = screen.getByLabelText(dummyOptions[1].label);
        const checkbox3: HTMLInputElement = screen.getByLabelText(dummyOptions[2].label);

        //When: 初期値 何も選択されていない状態
        expect(checkbox1.checked).toBe(false);
        expect(checkbox2.checked).toBe(false);
        expect(checkbox3.checked).toBe(false);

        //When: 2番目の選択肢を選択
        await userEvent.click(checkbox2);
        expect(checkbox1.checked).toBe(false); //Then: 1番目の選択肢が選択されていないこと
        expect(checkbox2.checked).toBe(true); //Then: 2番目の選択肢が選択されていること
        expect(checkbox3.checked).toBe(false); //Then: 3番目の選択肢が選択されていないこと

        //When: 3番目の選択肢を選択
        await userEvent.click(checkbox3);
        expect(checkbox1.checked).toBe(false); //Then: 1番目の選択肢が選択されていないこと
        expect(checkbox2.checked).toBe(true); //Then: 2番目の選択肢が選択されたままであること
        expect(checkbox3.checked).toBe(true); //Then: 3番目の選択肢が選択されていること
    });
});
