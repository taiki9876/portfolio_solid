import type { Meta, StoryObj } from '@storybook/react';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import { ArrowUpIcon } from './index';

/**
 * 上矢印アイコン
 */
const meta: Meta<typeof ArrowUpIcon> = {
    title: 'UI/Icon/ArrowUpIcon',
    component: ArrowUpIcon,
    tags: ['autodocs'],
    argTypes: {
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
