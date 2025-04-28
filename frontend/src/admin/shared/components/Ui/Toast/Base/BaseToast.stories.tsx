import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './index';

const meta = {
    title: 'UI/Toast/Toast',
    component: Toast,
    tags: ['autodocs'],
    argTypes: {
        type: {
            options: ['info', 'error'],
            control: {
                type: 'inline-radio',
                labels: {
                    info: 'info',
                    error: 'error',
                },
            },
        },
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    padding: '40px',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof Toast>;

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        message: '〇〇を登録しました。',
        type: 'info',
    },
};
