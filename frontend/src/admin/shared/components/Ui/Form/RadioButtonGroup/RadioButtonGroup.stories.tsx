import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { RadioButtonGroup } from './index';

/**
 * 複数のラジオボタンをまとめるコンポーネント
 */
const meta: Meta<typeof RadioButtonGroup> = {
    title: 'Ui/Form/RadioButtonGroup',
    component: RadioButtonGroup,
    tags: ['autodocs'],
    excludeStories: ['dummyOptions'],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const dummyOptions = [
    { label: 'オプション1', value: 'value1' },
    { label: 'オプション2', value: 'value2' },
    { label: 'オプション3', value: 'value3' },
];
export const Example: Story = {
    args: {
        label: 'ラベル',
        groupName: 'example',
        options: dummyOptions,
        value: 'value1',
        flexDirection: 'row',
        required: true,
    },
    render: ({ label, groupName, options, required, flexDirection }) => {
        const [{ value }, updateArgs] = useArgs();

        return (
            <RadioButtonGroup
                label={label}
                groupName={groupName}
                options={options}
                value={value as string}
                required={required}
                flexDirection={flexDirection}
                changeValue={(value: string) => updateArgs({ value })}
            />
        );
    },
};
