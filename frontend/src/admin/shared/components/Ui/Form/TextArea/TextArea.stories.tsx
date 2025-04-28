import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './index';

/**
 * 複数行テキスト入力欄
 */
const meta: Meta<typeof TextArea> = {
    title: 'Ui/Form/TextArea',
    component: TextArea,
    tags: ['autodocs'],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        label: '住所',
        placeholder: '〇〇を入力してください',
        required: true,
        disabled: false,
        rows: 5,
    },
};
