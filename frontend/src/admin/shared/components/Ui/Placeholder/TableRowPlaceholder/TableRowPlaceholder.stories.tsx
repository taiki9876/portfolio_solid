import type { Meta, StoryObj } from '@storybook/react';
import { TableRowPlaceholder } from './index';

/**
 * テーブルの行での利用を想定したプレースホルダー
 */
const meta: Meta<typeof TableRowPlaceholder> = {
    title: 'Ui/Placeholder/TableRowPlaceholder',
    component: TableRowPlaceholder,
    tags: ['autodocs'],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {},
};
