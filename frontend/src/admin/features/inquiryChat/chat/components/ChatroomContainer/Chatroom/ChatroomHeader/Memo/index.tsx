import { TextButton } from '@admin/shared/components/Ui/Button/TextButton';
import { PencilIcon } from '@admin/shared/components/Ui/Icon/PencilIcon';
import { Colors } from '@admin/assets/styles/colors';
import { ChatroomCustomerType } from '@admin/domain/chat/models/ChatrromCustomerType';
import styles from '../ChatroomHeader.module.css';
import { useOpenMemoForm } from './useOpenMemoForm';

type Props = {
    customer: ChatroomCustomerType;
};
export const Memo = ({ customer }: Props) => {
    const { handleOpenMemo } = useOpenMemoForm(customer);

    return (
        <div className={styles.button} onClick={handleOpenMemo}>
            <TextButton
                label="メモ"
                variant="outline"
                icon={<PencilIcon color={Colors.primary} />}
            />
        </div>
    );
};
