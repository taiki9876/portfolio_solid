import { useState } from 'react';
import { HeaderType } from '@admin/shared/components/Ui/Table/TableHeader';

export const useColumnHandle = (headers: HeaderType[]) => {
    const [displayColumns, setDisplayColumns] = useState<string[]>(
        headers.map((header) => header.key)
    );
    const handleDisplayColumnsChange = (selectedValues: string[]) => {
        if (selectedValues.length === 0) {
            //非表示カラム無しはNGとする。必ず一つは以上のカラムを表示する
            return;
        }
        setDisplayColumns(selectedValues);
    };

    // 表示中のヘッダーのインデックスを返す NOTE: 行のセルの表示・非表示に利用
    const displayIndexes = (): number[] => {
        return headers.reduce<number[]>((result, header, currentIndex) => {
            if (displayColumns.includes(header.key)) {
                result.push(currentIndex);
            }

            return result;
        }, []);
    };

    return {
        displayColumns,
        displayIndexes: displayIndexes(),
        handleDisplayColumnsChange,
    };
};
