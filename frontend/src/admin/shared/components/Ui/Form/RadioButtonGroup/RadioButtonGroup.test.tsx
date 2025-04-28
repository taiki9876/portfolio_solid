import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioButtonGroup } from '@admin/shared/components/Ui/Form/RadioButtonGroup/index';
import { dummyOptions } from './RadioButtonGroup.stories';

describe('test_RadioButtonGroup', () => {
    const RadioButtonGroupWithState = () => {
        const [value, setValue] = useState(dummyOptions[0].value);
        return (
            <RadioButtonGroup
                groupName="example"
                value={value}
                options={dummyOptions}
                changeValue={(value: string) => setValue(value)}
                flexDirection="row"
            />
        );
    };
    test('正しい操作ができること', async () => {
        //Given
        render(<RadioButtonGroupWithState />);

        const option1: HTMLInputElement = screen.getByLabelText(dummyOptions[0].label);
        const option2: HTMLInputElement = screen.getByLabelText(dummyOptions[1].label);
        const option3: HTMLInputElement = screen.getByLabelText(dummyOptions[2].label);

        //When: 初期値
        expect(option1.checked).toBe(true); //Then: 1番目の選択肢が選択されていること

        //When: 2番目の選択肢を選択
        await userEvent.click(option2);
        expect(option1.checked).toBe(false); //Then: 1番目の選択肢が選択されていないこと
        expect(option2.checked).toBe(true); //Then: 2番目の選択肢が選択されていること

        //When: 3番目の選択肢を選択
        await userEvent.click(option3);
        expect(option1.checked).toBe(false); //Then: 1番目の選択肢が選択されていないこと
        expect(option2.checked).toBe(false); //Then: 2番目の選択肢が選択されていないこと
        expect(option3.checked).toBe(true); //Then: 3番目の選択肢が選択されていること
    });
});
