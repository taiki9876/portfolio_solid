import type { Meta, StoryObj } from '@storybook/react';
import { Colors } from '@admin/assets/styles/colors';
import { BrowserRouter } from 'react-router-dom';
import { SideNav } from './index';

/**
 * サイドナビゲーション
 */
const meta: Meta<typeof SideNav> = {
    title: 'Layout/SideNav',
    component: SideNav,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <BrowserRouter>
                <div style={{ backgroundColor: Colors.gray100, margin: '2rem', height: '600px' }}>
                    <Story />
                </div>
            </BrowserRouter>
        ),
    ],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {};
