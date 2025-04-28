import { useState } from 'react';
import { TextInput } from '@admin/shared/components/Ui/Form';
import { useEnterHandler } from '@src/shared/hooks/useEnterHandler';
import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import { useGetSearchParams, useSetSearchParams } from '@src/shared/hooks/useSyncSearchParams';

const PARAM_NAME = 'name';
export const SearchNameInput = () => {
    const setSearchCondition = useInquiryStore((state) => state.setSearchCondition);
    const [name, setName] = useState<string>('');
    const { setUrlParams } = useSetSearchParams();

    useGetSearchParams((params) => {
        setSearchCondition({ name: params[PARAM_NAME] ?? '' });
        setName(params[PARAM_NAME] ?? '');
    });

    const { enterHandleAttribute } = useEnterHandler(() => {
        setUrlParams([{ value: name, key: PARAM_NAME }]);
        setSearchCondition({ name });
    });

    return (
        <TextInput
            value={name}
            onChange={setName}
            placeholder="氏名を入力"
            attributes={enterHandleAttribute}
        />
    );
};
