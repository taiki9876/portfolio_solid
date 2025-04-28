import type { Meta, StoryObj } from '@storybook/react';
import { SomeScreenPlaceholder } from './index';

/**
 * * レイアウトを組み合わせた
 * * 詳細ページのレイアウトを想定しているが、汎用的に使っても良い
 */
const meta: Meta<typeof SomeScreenPlaceholder> = {
    title: 'Ui/Placeholder/SomeScreenPlaceholder',
    component: SomeScreenPlaceholder,
    tags: ['autodocs'],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {},
};
