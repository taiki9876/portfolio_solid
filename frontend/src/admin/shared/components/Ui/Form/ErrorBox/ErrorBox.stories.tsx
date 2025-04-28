import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBox } from './index';

/**
 * エラーボックス
 */
const meta: Meta<typeof ErrorBox> = {
    title: 'Ui/Form/ErrorBox',
    component: ErrorBox,
    tags: ['autodocs'],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        messages: [
            ' 入力内容をご確認ください',
            '・〇〇は必須入力です',
            '・〇〇は半角英数字で入力してください',
        ],
    },
};
