import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './index';

/**
 * テキスト入力欄
 */
const meta: Meta<typeof TextInput> = {
    title: 'Ui/Form/TextInput',
    component: TextInput,
    tags: ['autodocs'],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        label: 'ラベル',
        placeholder: '〇〇を入力してください',
    },
};
