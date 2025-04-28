import { SectionTitle } from '@admin/shared/components/Ui/DetailComponents/SectionTitle';
import { InfoItemRow } from '@admin/shared/components/Ui/DetailComponents/InfoItemRow';
import styles from './CustomerInfo.module.css';
import commonStyles from '../DetailContainer.module.css';
import { ExtraField } from './ExtraField';

const dummyExtraField = [
    'このサービスが気に入りました',
    'ご連絡させていただきます',
    '素晴らしいアプリケーションですね',
    '今日は素晴らしい日です',
    '',
];
export const CustomerInfo = () => {
    return (
        <div>
            <div className={commonStyles.infoSection}>
                <SectionTitle
                    title="田中 透 (タナカ トオル) 様"
                    titleVariant="primary"
                    onEdit={{ label: '編集', onClick: () => {} }}
                />

                <div className={styles.memberInfo}>
                    <InfoItemRow
                        columns={[
                            { key: 'customerCode', label: '会員コード', value: '1000001097' },
                            { key: 'customerNumber', label: '会員番号', value: '687940' },
                        ]}
                    />
                    <InfoItemRow
                        columns={[
                            { key: 'birthDate', label: '生年月日', value: '2024/05/09' },
                            { key: 'gender', label: '性別', value: '女性' },
                        ]}
                    />
                    <InfoItemRow
                        columns={[
                            { key: 'birthDate', label: '電話番号', value: '(03) 1234-5678' },
                            { key: 'gender', label: '案内メール', value: 'OK' },
                        ]}
                    />
                    <InfoItemRow
                        columns={[
                            { key: 'birthDate', label: 'メール', value: 'mano.tomio@gmail.com' },
                        ]}
                    />
                    <InfoItemRow
                        columns={[{ key: 'birthDate', label: '郵便番号', value: '〒150-2345' }]}
                    />
                    <InfoItemRow
                        columns={[
                            {
                                key: 'birthDate',
                                label: '住所',
                                value: '東京都渋谷区本町2丁目4-7サニーマンション203',
                            },
                        ]}
                    />
                </div>
            </div>

            <ExtraField values={dummyExtraField} />
        </div>
    );
};
