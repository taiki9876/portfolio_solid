import { useState } from 'react';
import { TextArea } from '@admin/shared/components/Ui/Form';
import { SectionTitle } from '@admin/shared/components/Ui/DetailComponents/SectionTitle';
import commonStyles from '../DetailContainer.module.css';

export const CustomerMemo = () => {
    const [text, setText] = useState('');
    return (
        <div className={commonStyles.infoSection}>
            <SectionTitle title="メモ" />
            <div>
                <TextArea value={text} onChange={setText} rows={7} />
            </div>
        </div>
    );
};
