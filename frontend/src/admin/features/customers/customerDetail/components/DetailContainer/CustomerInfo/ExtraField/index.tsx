import { SectionTitle } from '@admin/shared/components/Ui/DetailComponents/SectionTitle';
import { InfoItemRow } from '@admin/shared/components/Ui/DetailComponents/InfoItemRow';
import styles from '../CustomerInfo.module.css';
import commonStyles from '../../DetailContainer.module.css';

type Props = {
    values: string[];
};
export const ExtraField = ({ values }: Props) => {
    return (
        <div className={commonStyles.infoSection}>
            <SectionTitle title="追加項目" onEdit={{ label: '編集', onClick: () => {} }} />
            <div className={styles.memberInfo}>
                {values.map((value, index) => (
                    <InfoItemRow
                        key={`extraField-${index}`}
                        columns={[
                            { key: 'extraField', label: `追加項目${index + 1}`, value: value },
                        ]}
                    />
                ))}
            </div>
        </div>
    );
};
