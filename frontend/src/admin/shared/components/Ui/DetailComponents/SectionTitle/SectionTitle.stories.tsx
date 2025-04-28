import type { Meta, StoryObj } from '@storybook/react';
import { SectionTitle } from './index';

/**
 * 各種の詳細ページにおける、タイトルコンポーネント。
 */
const meta: Meta<typeof SectionTitle> = {
    title: 'Ui/DetailComponents/SectionTitle',
    component: SectionTitle,
    tags: ['autodocs'],
    argTypes: {
        titleVariant: {
            options: ['primary', 'normal'],
            control: {
                type: 'select',
            },
        },
    },
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        title: '契約情報',
        onEdit: { label: '編集', onClick: () => {} },
        titleVariant: 'normal',
    },
};
