import type { Meta, StoryObj } from '@storybook/react';
import { Tab } from './index';

/**
 * チャットの種類を選択するタブ
 */
const meta: Meta<typeof Tab> = {
    title: 'Feature/Inquiry/Tab',
    component: Tab,
    tags: ['autodocs'],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        label: '店舗チャット',
        onClick: () => console.log('Tab clicked'),
    },
};
