import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { formatDate, now, updateDate, updateTime } from '@admin/shared/util/dateUtil';
import { DatePicker } from './index';

/**
 * 日付+時間選択
 */
const meta: Meta<typeof DatePicker> = {
    title: 'Ui/Form/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: '600px', height: '400px', padding: '2rem' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        label: '日付',
        placeholder: '日付を選択してください',
        required: false,
        withTime: false,
    },
    render: ({ label, placeholder, required, withTime }) => {
        const [{ value }, updateArgs] = useArgs();

        return (
            <DatePicker
                label={label}
                required={required}
                onReset={() => updateArgs({ value: undefined })}
                onDateChange={(date: string) =>
                    updateArgs({
                        value: updateDate((value as string | undefined) ?? now(), date),
                    })
                }
                onTimeChange={(hour: string | undefined, minute: string | undefined) => {
                    updateArgs({
                        value: updateTime(
                            (value as string | undefined) ?? formatDate(now()),
                            hour,
                            minute
                        ),
                    });
                }}
                value={value as string | undefined}
                withTime={withTime}
                placeholder={placeholder}
            />
        );
    },
};
