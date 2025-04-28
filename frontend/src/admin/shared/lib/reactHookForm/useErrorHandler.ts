import { useEffect, useRef, useState } from 'react';
import { FieldErrors } from 'react-hook-form';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

/**
 * エラーハンドリングのカスタムフック
 * react hook form のエラーがある場合に画面上部にスクロールする機能を追加する。
 */
export const useErrorHandler = () => {
    const apexMarker = useRef<HTMLDivElement>(null); //form要素やスクロールしたい要素に指定する。
    const [hasError, setHasError] = useState(false);

    const resetError = () => {
        setHasError(false);
    };

    const toggleError = (forceState: boolean | undefined) => {
        if (forceState !== undefined) {
            setHasError(forceState);
            return;
        }
        setHasError((prev) => !prev);
    };

    useEffect(() => {
        if (hasError) {
            apexMarker.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [hasError]);

    // エラーがある場合にスクロールする handleSubmitの第二引数に指定する
    const onInputError = (_errors: FieldErrors) => {
        setHasError(true);
    };
    return {
        apexMarker,
        hasError,
        toggleError,
        resetError,
        onInputError,
    };
};

type ServerErrors = { [key: string]: string[] | { [key: string]: string } };
export const setServerErrors = <T extends FieldValues>(
    errors: ServerErrors,
    setError: UseFormSetError<T>
) => {
    Object.entries(errors).forEach(([field, messages]) => {
        const mes = Object.values(messages);
        if (mes.length > 0) {
            setError(field as Path<T>, {
                type: 'server',
                message: mes[0],
            });
        }
    });
};
