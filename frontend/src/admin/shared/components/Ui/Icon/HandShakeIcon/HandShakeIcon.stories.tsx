import type { Meta, StoryObj } from '@storybook/react';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import { HandShakeIcon } from './index';

/**
 * チャット・お問い合わせアイコン
 */
const meta: Meta<typeof HandShakeIcon> = {
    title: 'UI/Icon/HandShakeIcon',
    component: HandShakeIcon,
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
