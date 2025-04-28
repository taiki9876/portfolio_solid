import type { Meta, StoryObj } from '@storybook/react';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import { SettingIcon } from './index';

/**
 * 設定・歯車アイコン
 */
const meta: Meta<typeof SettingIcon> = {
    title: 'UI/Icon/SettingIcon',
    component: SettingIcon,
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
