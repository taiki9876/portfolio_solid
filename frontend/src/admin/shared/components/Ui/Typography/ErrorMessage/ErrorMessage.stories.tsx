import type { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from './index';

/**
 * 汎用的なエラーメッセージ
 */
const meta: Meta<typeof ErrorMessage> = {
    title: 'Ui/Typography/ErrorMessage',
    component: ErrorMessage,
    tags: ['autodocs'],
    argTypes: {
        level: {
            options: ['error', 'warning'],
            control: {
                type: 'select',
            },
        },
    },
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        message: '〇〇のデータ取得に失敗しました',
    },
};
