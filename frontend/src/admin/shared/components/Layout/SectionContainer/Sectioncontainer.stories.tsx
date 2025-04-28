import type { Meta, StoryObj } from '@storybook/react';
import { Colors } from '@admin/assets/styles/colors';
import { SectionContainer } from './index';

/**
 * 各コンテンツの枠組みを提供するコンテナコンポーネント
 */
const meta: Meta<typeof SectionContainer> = {
    title: 'Layout/SectionContainer',
    component: SectionContainer,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ backgroundColor: Colors.gray100, padding: '2rem' }}>
                <Story
                    args={{
                        children: <p>コンテンツ</p>,
                    }}
                />
            </div>
        ),
    ],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
