import type { Meta, StoryObj } from '@storybook/react';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import { ArrowLeftIcon } from './index';

/**
 * 左矢印アイコン
 */
const meta: Meta<typeof ArrowLeftIcon> = {
    title: 'UI/Icon/ArrowLeftIcon',
    component: ArrowLeftIcon,
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
