import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { Checkbox } from './index';

/**
 * チェックボックス
 */
const meta: Meta<typeof Checkbox> = {
    title: 'Ui/Button/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        label: 'ラベル',
        disabled: false,
        checked: false,
    },
    render: ({ label, disabled }) => {
        const [{ checked }, updateArgs] = useArgs();

        return (
            <Checkbox
                label={label}
                checked={checked as boolean}
                disabled={disabled}
                onChange={(checked: boolean) => updateArgs({ checked })}
            />
        );
    },
};
