import type { Meta, StoryObj } from '@storybook/react';
import { PeopleIcon } from '@admin/shared/components/Ui/Icon/PeopleIcon';
import { Colors } from '@admin/assets/styles/colors';
import { TextButton } from './index';

/**
 * * 汎用的なテキストボタン
 * * アイコンを指定することも可能
 */

const meta = {
    title: 'UI/Button/TextButton',
    component: TextButton,
    tags: ['autodocs'],
} satisfies Meta<typeof TextButton>;

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        label: 'ボタン',
        variant: 'primary',
    },
};

export const ExampleWithIcon: Story = {
    args: {
        label: 'ボタン',
        variant: 'primary',
        icon: <PeopleIcon color={Colors.white} />,
    },
};
