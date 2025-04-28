import { useEffect } from 'react';
import { useSwitch } from '@src/shared/hooks/useSwitch';
import { Colors } from '@admin/assets/styles/colors';

export const isActive = (
    target: string,
    currentPath: string,
    allowPartialMatch: boolean = false
): boolean => {
    const targetPathStr = target.replace(/\//g, '');
    const currentPathStr = currentPath.replace(/\//g, '');

    if (allowPartialMatch) {
        return currentPathStr.startsWith(targetPathStr);
    }
    return targetPathStr === currentPathStr;
};

export const useIconColor = (isActive: boolean) => {
    const { isOn, on, off } = useSwitch(false);

    useEffect(() => {
        return off;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);

    const handleMouseOver = () => {
        if (isActive === true) return;
        on();
    };

    const handleMouseLeave = () => {
        if (isActive === true) return;
        off();
    };

    const calcIconColor = () => {
        if (isActive === true) return Colors.white;

        return isOn ? Colors.white : Colors.text;
    };

    return {
        iconColor: calcIconColor(),
        handleMouseOver,
        handleMouseLeave,
    };
};
