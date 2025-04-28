import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { RadioButton } from './index';

/**
 * * ラジオボタン
 * * ラジオボタングループはUi/Form/RadioButtonGroupを参照
 */
const meta: Meta<typeof RadioButton> = {
    title: 'Ui/Button/RadioButton',
    component: RadioButton,
    tags: ['autodocs'],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        label: 'ラベル',
        value: 'value',
        name: 'name',
        disabled: false,
        checked: false,
    },
    render: ({ label, value, name, disabled }) => {
        const [{ checked }, updateArgs] = useArgs();

        return (
            <RadioButton
                label={label}
                value={value}
                name={name}
                checked={checked as boolean}
                disabled={disabled}
                onChange={(value: string) => {
                    updateArgs({ checked: value === 'value' });
                }}
            />
        );
    },
};
