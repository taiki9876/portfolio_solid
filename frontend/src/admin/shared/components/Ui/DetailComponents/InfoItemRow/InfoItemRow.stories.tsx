import type { Meta, StoryObj } from '@storybook/react';
import { InfoItemRow } from './index';

/**
 * 各種の詳細ページにおける、情報アイテムコンポーネント。2カラムレイアウトが基本。
 */
const meta: Meta<typeof InfoItemRow> = {
    title: 'Ui/DetailComponents/InfoItemRow',
    component: InfoItemRow,
    tags: ['autodocs'],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const DoubleColumn: Story = {
    args: {
        columns: [
            { key: 'extraField-1', label: '追加項目1', value: 'value1' },
            { key: 'extraField-2', label: '追加項目2', value: 'value2' },
        ],
    },
};

export const SingleColumn: Story = {
    args: {
        columns: [{ key: 'extraField-1', label: '追加項目1', value: 'value1' }],
    },
};
