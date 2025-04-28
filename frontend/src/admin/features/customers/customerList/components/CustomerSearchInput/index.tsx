import { useState } from 'react';
import { useCustomerStore } from '@admin/features/customers/state/useCustomerStore';
import { SearchTextInput } from '@admin/shared/components/Ui/Form/SearchTextInput';
import { useGetSearchParams, useSetSearchParams } from '@src/shared/hooks/useSyncSearchParams';
import { mSecondsFrom } from '@admin/shared/util/numberUtil';

const PARAM_NAME = 'word';
export const CustomerSearchInput = () => {
    const setSearchWord = useCustomerStore((state) => state.setSearchWord);
    const setPageMeta = useCustomerStore((state) => state.setPageMeta);
    const [text, setText] = useState('');

    useGetSearchParams((params) => {
        setSearchWord(params[PARAM_NAME] ?? '');
        setText(params[PARAM_NAME] ?? '');
        setPageMeta(params);
    });

    const { setUrlParams } = useSetSearchParams();
    const handleSearch = () => {
        setUrlParams([{ value: text, key: PARAM_NAME }]);

        //NOTE: URLの反映を待つために少し遅延して実行
        setTimeout(
            () => {
                setPageMeta({ page: 1 }); //NOTE: 新しい検索ワードで検索するためにページを1に戻す
                setSearchWord(text);
            },
            mSecondsFrom(0.2, 'second')
        );
    };

    return (
        <SearchTextInput
            text={text}
            setText={setText}
            handleSearch={handleSearch}
            placeholder="名前、会員コードを入力"
        />
    );
};
