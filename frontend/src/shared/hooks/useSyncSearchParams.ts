import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * ブラウザURL欄のクエリパラメータとstateを同期するAPIを提供する
 */
export const useGetSearchParams = (setParams: (params: Record<string, string>) => void) => {
    const [urlParams] = useSearchParams();

    useEffect(() => {
        const paramsObj = Object.fromEntries(urlParams.entries());

        setParams(paramsObj);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlParams]);
};

/**
 * ブラウザURL欄のクエリパラメータとstateを同期するAPIを提供する
 */
export const useSetSearchParams = () => {
    const [urlParams, _setUrlParams] = useSearchParams();

    const setUrlParams = (
        params: { key: string; value: string | number }[],
        override: boolean = false
    ) => {
        const newParams = new URLSearchParams();

        if (!override) {
            Array.from(urlParams.entries()).forEach(([key, val]) => {
                newParams.set(key, String(val));
            });
        }
        params.forEach(({ key, value }) => {
            if (String(value) === '') {
                newParams.delete(key);
            } else {
                newParams.set(key, String(value));
            }
        });

        _setUrlParams(newParams);
    };

    return { setUrlParams };
};
