import type { Meta, StoryObj } from '@storybook/react';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import { HamburgerMenuIcon } from './index';

/**
 * ハンバーガーメニューアイコン
 */
const meta: Meta<typeof HamburgerMenuIcon> = {
    title: 'UI/Icon/HamburgerMenuIcon',
    component: HamburgerMenuIcon,
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
