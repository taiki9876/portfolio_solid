import type { Meta, StoryObj } from '@storybook/react';
import { SearchTextInput } from './index';

/**
 * 検索入力欄
 */
const meta: Meta<typeof SearchTextInput> = {
    title: 'Ui/Form/SearchTextInput',
    component: SearchTextInput,
    tags: ['autodocs'],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {},
};
