import { useRef } from 'react';

/**
 * 入力欄をEnterした場合の検索実行を制御する(ハンドラを提供する)カスタムフック
 * enterHandleAttributeをtext inputの属性として渡す。Enterキーが押された時にenterFunctionを実行する
 * ユースケースは、検索ボックスでの検索実行など = onChangeの度に実行すると負荷が高い場合に使用
 * @param enterFunction
 */
export const useEnterHandler = (enterFunction: () => void) => {
    const isComposing = useRef<boolean>(false);
    const handleCompositionStart = () => {
        isComposing.current = true;
    };
    const handleCompositionEnd = () => {
        isComposing.current = false;
    };
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !isComposing.current) {
            event.preventDefault();
            enterFunction();
        }
    };

    return {
        handleCompositionStart,
        handleCompositionEnd,
        handleKeyDown,
        enterHandleAttribute: {
            onCompositionStart: handleCompositionStart,
            onCompositionEnd: handleCompositionEnd,
            onKeyDown: handleKeyDown,
        },
    };
};
