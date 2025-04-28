import { CSSProperties, MouseEvent, useState } from 'react';
import { useSwitch } from '@src/shared/hooks/useSwitch';
import { useChatContentContext } from '../../../../context/useChatContentContext';

export const useOpenMenu = () => {
    const [menuPosition, setMenuPosition] = useState<CSSProperties>({ top: '24px' });
    const { chatRoomRef } = useChatContentContext();
    const { on: openMenu, off: closeMenu, isOn: isOpenMenu } = useSwitch();

    const handleOpenMenu = (event: MouseEvent) => {
        if (chatRoomRef.current !== null) {
            const chatRoomContent = chatRoomRef.current;
            const menuModalHeight = 50; //NOTE: メニューのモーダルの高さを100pxとする。※実際には可変
            const isBottomOver =
                event.clientY + menuModalHeight >
                chatRoomContent.clientHeight + chatRoomContent.offsetTop;

            if (isBottomOver) {
                //NOTE: メニューが下にはみ出す場合の処理
                setMenuPosition({ top: `-${menuModalHeight - 20}px` });
            } else {
                setMenuPosition({ top: '24px' });
            }
        }
        openMenu();
    };

    return {
        menuPosition,
        handleOpenMenu,
        isOpenMenu,
        closeMenu,
    };
};
