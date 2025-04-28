import type { Meta, StoryObj } from '@storybook/react';
import { DownloadIcon } from '@admin/shared/components/Ui/Icon/DownloadIcon';
import { ActionButton } from './index';

/**
 * CSVダウンロードや、新規登録などのアクションを実行するためのボタン
 */
const meta: Meta<typeof ActionButton> = {
    title: 'UI/Button/ActionButton',
    component: ActionButton,
    tags: ['autodocs'],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        label: 'CSV出力',
        icon: DownloadIcon,
    },
};
