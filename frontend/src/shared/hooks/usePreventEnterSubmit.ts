import { KeyboardEvent, useCallback } from 'react';

// 主にonKeyDownなどに設定する、input type textのEnterキーによるsubmitを防ぐためのカスタムフック
export const usePreventEnterSubmit = () => {
    return useCallback((event: KeyboardEvent<HTMLFormElement>) => {
        if (event.key === 'Enter') {
            const target = event.target as HTMLInputElement;
            if (target.tagName === 'INPUT' && target.type === 'text') {
                event.preventDefault();
            }
        }
    }, []);
};
