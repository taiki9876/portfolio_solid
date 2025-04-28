import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { Dropdown } from './index';

/**
 * 複数行テキスト入力欄
 */
const meta: Meta<typeof Dropdown> = {
    title: 'Ui/Form/Dropdown',
    component: Dropdown,
    tags: ['autodocs'],
    excludeStories: ['dummyOptions'],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const dummyOptions = [
    { label: '選択肢1', value: '1' },
    { label: '選択肢2', value: '2' },
    { label: '選択肢3', value: '3' },
    { label: '選択肢4', value: '4' },
];
export const Example: Story = {
    args: {
        options: dummyOptions,
        disabled: false,
        label: '選択肢を以下から選ぶ',
        required: false,
        placeholder: '未選択',
        isDisplayIcon: true,
    },
    render: ({ options, disabled, label, required, placeholder, isDisplayIcon }) => {
        const [{ selectedValue }, updateArgs] = useArgs();
        return (
            <Dropdown
                options={options}
                selectedValue={selectedValue as string}
                disabled={disabled}
                label={label}
                onChange={(value: string) => updateArgs({ selectedValue: value })}
                required={required}
                placeholder={placeholder}
                isDisplayIcon={isDisplayIcon}
            />
        );
    },
};
