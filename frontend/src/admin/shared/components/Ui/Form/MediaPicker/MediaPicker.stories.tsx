import type { Meta, StoryObj } from '@storybook/react';
import { MediaPicker } from './index';

/**
 * * 画像・動画ファイルを選択する。
 * * ドラッグアンドドロップ対応。
 * * 主にForm部品として
 */
const meta: Meta<typeof MediaPicker> = {
    title: 'Ui/Form/MediaPicker',
    component: MediaPicker,
    tags: ['autodocs'],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        contentKey: 'image',
        mediaType: 'image',
    },
};
