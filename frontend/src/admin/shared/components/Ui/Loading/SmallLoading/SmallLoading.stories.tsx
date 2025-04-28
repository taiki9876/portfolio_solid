import type { Meta, StoryObj } from '@storybook/react';
import { SmallLoading } from './index';

/**
 * 部分的ローディング
 */
const meta: Meta<typeof SmallLoading> = {
    title: 'Ui/Loading/SmallLoading',
    component: SmallLoading,
    tags: ['autodocs'],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {},
};
