import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { CheckboxGroup } from './index';

/**
 * 複数のチェックボックスをまとめるコンポーネント
 */
const meta: Meta<typeof CheckboxGroup> = {
    title: 'Ui/Form/CheckboxGroup',
    component: CheckboxGroup,
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
        selectedValues: ['value1'],
        flexDirection: 'row',
        required: true,
    },
    render: ({ label, groupName, options, required, flexDirection }) => {
        const [{ selectedValues }, updateArgs] = useArgs();

        return (
            <CheckboxGroup
                label={label}
                groupName={groupName}
                selectedValues={selectedValues as string[]}
                options={options}
                onChange={(selectedValues: string[]) =>
                    updateArgs({ selectedValues: selectedValues })
                }
                required={required}
                flexDirection={flexDirection}
            />
        );
    },
};
