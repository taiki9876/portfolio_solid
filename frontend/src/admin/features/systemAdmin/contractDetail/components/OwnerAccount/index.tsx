import { SectionTitle } from '@admin/shared/components/Ui/DetailComponents/SectionTitle';
import { InfoItemRow } from '@admin/shared/components/Ui/DetailComponents/InfoItemRow';
import { OwnerAdmin } from '@admin/domain/contract/model';

type Props = {
    ownerAdmin: OwnerAdmin;
};
export const OwnerAccount = ({ ownerAdmin }: Props) => {
    return (
        <>
            <SectionTitle
                title="店舗オーナーアカウント"
                onEdit={{
                    label: 'パスワードリセット',
                    onClick: () => alert('TODO: パスワードリセット機能'),
                }}
            />
            <InfoItemRow
                columns={[{ key: 'loginId', label: 'ログインID', value: ownerAdmin.adminLoginId }]}
            />
            <InfoItemRow
                columns={[{ key: 'password', label: 'パスワード', value: ownerAdmin.password }]}
            />
        </>
    );
};
