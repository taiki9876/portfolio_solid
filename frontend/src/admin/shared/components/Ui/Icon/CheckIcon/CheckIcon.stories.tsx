import type { Meta, StoryObj } from '@storybook/react';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import { CheckIcon } from './index';

/**
 * チェック済みアイコン
 */
const meta: Meta<typeof CheckIcon> = {
    title: 'UI/Icon/CheckIcon',
    component: CheckIcon,
    tags: ['autodocs'],
    argTypes: {
        isOn: { control: 'boolean' },
        size: {
            options: Object.values(IconSize),
            mapping: IconSize,
            control: {
                type: 'select',
            },
        },
        color: { control: 'color' },
    },
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        size: IconSize.md,
    },
};
