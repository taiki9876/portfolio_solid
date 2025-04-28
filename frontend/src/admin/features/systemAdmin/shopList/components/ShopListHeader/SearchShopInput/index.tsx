import { useState } from 'react';
import { SearchTextInput } from '@admin/shared/components/Ui/Form/SearchTextInput';
import { useSystemAdminStore } from '@admin/features/systemAdmin/shared/systemAdminStore';
import { useGetSearchParams, useSetSearchParams } from '@src/shared/hooks/useSyncSearchParams';

const PARAM_NAME = 'word';
export const SearchShopInput = () => {
    const [text, setText] = useState('');
    const setSearchWord = useSystemAdminStore((state) => state.setShopSearchWord);

    useGetSearchParams((params) => {
        setSearchWord(params[PARAM_NAME] ?? '');
        setText(params[PARAM_NAME] ?? '');
    });
    const { setUrlParams } = useSetSearchParams();
    const handleSearch = () => {
        setUrlParams([{ value: text, key: PARAM_NAME }]);
        setSearchWord(text);
    };

    return (
        <SearchTextInput
            text={text}
            setText={setText}
            handleSearch={handleSearch}
            placeholder="店舗名を入力"
        />
    );
};
