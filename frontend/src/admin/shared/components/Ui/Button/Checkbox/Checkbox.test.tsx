import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './index';

describe('test_Checkbox', () => {
    const CheckboxWithState = ({ label }: { label: string }) => {
        const [isChecked, setIsChecked] = useState(false);

        return (
            <Checkbox
                label={label}
                checked={isChecked}
                onChange={(checked: boolean) => setIsChecked(checked)}
            />
        );
    };

    test('クリックするとチェック状態が変更されること', async () => {
        //Given
        render(<CheckboxWithState label="Test Label" />);
        const checkbox: HTMLInputElement = screen.getByRole('checkbox');

        //When: 初期値
        screen.getByLabelText('Test Label'); // Then: ラベルが表示されていること
        expect(checkbox.checked).toBe(false); //Then: チェックされていないこと

        //When: 1回目のクリック
        await userEvent.click(checkbox);
        expect(checkbox.checked).toBe(true); //Then: チェックされていること

        //When: 2回目のクリック
        await userEvent.click(checkbox);
        expect(checkbox.checked).toBe(false); //Then: チェックがはずれていること
    });
});
