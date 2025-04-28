import type { Meta, StoryObj } from '@storybook/react';
import { FulfilledPlaceholder } from './index';

/**
 * * プレースホルダー
 * * 親要素一杯に広がるので汎用的
 */
const meta: Meta<typeof FulfilledPlaceholder> = {
    title: 'Ui/Placeholder/FulfilledPlaceholder',
    component: FulfilledPlaceholder,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: '200px', height: '200px' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {},
};
