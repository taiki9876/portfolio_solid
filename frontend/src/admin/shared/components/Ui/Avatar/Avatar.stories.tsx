import type { Meta, StoryObj } from '@storybook/react';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import RoomImg from '@admin/assets/images/chatroom.png';
import { Avatar } from './index';

/**
 * チャットなどで利用するアバターコンポーネント
 */
const meta: Meta<typeof Avatar> = {
    title: 'UI/Avatar',
    component: Avatar,
    tags: ['autodocs'],
    argTypes: {
        size: {
            options: Object.values(IconSize),
            mapping: IconSize,
            control: {
                type: 'select',
            },
        },
    },
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
export const Example: Story = {
    args: {
        imgPath: RoomImg, //画像はダミー
    },
};
