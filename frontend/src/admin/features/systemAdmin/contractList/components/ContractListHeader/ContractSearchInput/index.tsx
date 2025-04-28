import { useState } from 'react';
import { SearchTextInput } from '@admin/shared/components/Ui/Form/SearchTextInput';
import { useSystemAdminStore } from '@admin/features/systemAdmin/shared/systemAdminStore';
import { useGetSearchParams, useSetSearchParams } from '@src/shared/hooks/useSyncSearchParams';

const PARAM_NAME = 'word';
export const ContractSearchInput = () => {
    const [text, setText] = useState('');
    const setConditions = useSystemAdminStore((state) => state.setContractSearchConditions);
    useGetSearchParams((params) => {
        setConditions({ word: params[PARAM_NAME] ?? '' });
        setText(params[PARAM_NAME] ?? '');
    });

    const { setUrlParams } = useSetSearchParams();
    const handleSearch = () => {
        setUrlParams([{ value: text, key: PARAM_NAME }]);
        setConditions({ word: text });
    };

    return (
        <SearchTextInput
            text={text}
            setText={setText}
            handleSearch={handleSearch}
            placeholder="契約名、キーを入力"
        />
    );
};
