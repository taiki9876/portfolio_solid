import { ActionButton } from '@admin/shared/components/Ui/Button/ActionButton';
import { TrashIcon } from '@admin/shared/components/Ui/Icon/TrashIcon';
import { Colors } from '@admin/assets/styles/colors';
import styles from './DetailHeader.module.css';

export const DetailHeader = () => {
    return (
        <div className={styles.detailHeaderContainer}>
            <ActionButton
                label="削除"
                onClick={() => {}}
                icon={() => <TrashIcon color={Colors.red} />}
                variant="danger"
            />
        </div>
    );
};
