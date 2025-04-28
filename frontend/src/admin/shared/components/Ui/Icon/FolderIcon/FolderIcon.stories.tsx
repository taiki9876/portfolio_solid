import type { Meta, StoryObj } from '@storybook/react';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import { FolderIcon } from './index';

/**
 * フォルダーアイコン
 */
const meta: Meta<typeof FolderIcon> = {
    title: 'UI/Icon/FolderIcon',
    component: FolderIcon,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: Object.values(IconSize),
            mapping: IconSize,
            control: {
                type: 'select',
            },
        },
        color: { control: 'color' },
    },
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        size: IconSize.md,
    },
};
