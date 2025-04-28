import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { formatDate, now, updateDate, updateTime } from '@admin/shared/util/dateUtil';
import { expect } from 'vitest';
import { DatePicker } from './index';

type Props = {
    placeholder: string;
    withTime?: boolean;
};
const DatePickerWithState = ({ placeholder, withTime }: Props) => {
    const [value, setValue] = useState<string | undefined>(undefined);

    const handleChange = (value: string | undefined) => {
        setValue(value);
    };

    return (
        <DatePicker
            label="生年月日"
            required={true}
            onReset={() => handleChange(undefined)}
            value={value}
            onDateChange={(newDate: string) => {
                const currentDate = value === undefined ? now() : value;
                handleChange(formatDate(updateDate(currentDate, newDate), { withTime: true }));
            }}
            withTime={withTime}
            onTimeChange={(hour: string | undefined, minute: string | undefined) => {
                const currentDate = value === undefined ? now() : value;

                handleChange(formatDate(updateTime(currentDate, hour, minute), { withTime: true }));
            }}
            placeholder={placeholder}
        />
    );
};

/**
 * 以下のテストシナリオ
 * 1. 初期表示としてプレースホルダーが表示されていること
 * 2. カレンダーを開く（inputをクリック）
 * 3. 日付を選択する (日付が選択されていることを確認する)
 * 4. リセットボタンをクリックする (日付がリセットされていることを確認する)
 * 5. カレンダーを閉じる (カレンダーフォームがクローズされていることを確認する)
 */
test('test_DatePicker_日付を選択操作ができること', async () => {
    //Given
    render(<DatePickerWithState placeholder="日付を選択してください" withTime={true} />);
    const calendarInput = screen.getByTestId('calendar-input');

    //When: 1. 初期値
    const placeholder = screen.getByTestId('calendar-input-placeholder');
    expect(placeholder.textContent).toBe('日付を選択してください'); // Then: プレースホルダーが表示されていること

    //When: 2. カレンダーを開く //Then: カレンダーフォームがオープンされていること
    await userEvent.click(calendarInput);
    screen.getByTestId('calendar-form');
    expect(screen.queryByTestId('time-picker')).not.toBeNull(); //Then: 時間選択が表示されていること

    //When: 3. 日付を選択する (テストとしては最初の日を選択)
    //Then: 選択した日付が表示されていること
    await userEvent.click(screen.getByText('1'));
    expect(placeholder.textContent).toBe(
        updateDate(now(), now().startOf('month')).format('YYYY/MM/DD HH:mm')
    );

    //When: 4. リセットボタンをクリックする //Then: 日付がリセットされていること
    await userEvent.click(screen.getByTestId('calendar-form-reset'));
    expect(placeholder.textContent).toBe('日付を選択してください');

    //When: 5. カレンダーを閉じる //Then: カレンダーフォームがクローズされていること
    await userEvent.click(screen.getByTestId('modal-component-close'));
    expect(screen.queryByTestId('calendar-form')).toBeNull();
});

test('test_DatePicker_時間指定なしの場合_時間選択できないこと', async () => {
    //Given
    render(<DatePickerWithState placeholder="日付を選択してください" withTime={false} />);
    const calendarInput = screen.getByTestId('calendar-input');

    //When: カレンダーを開く
    await userEvent.click(calendarInput);
    expect(screen.queryByTestId('time-picker')).toBeNull(); //Then: 時間選択が表示されていないこと

    //When: 日付を選択する (テストとしては最初の日を選択)
    await userEvent.click(screen.getByText('1'));
    const placeholder = screen.getByTestId('calendar-input-placeholder');
    expect(placeholder.textContent).toBe(
        updateDate(now(), now().startOf('month')).format('YYYY/MM/DD')
    ); // Then: 時間は表示されていないこと
});
