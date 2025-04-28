import { AttentionIcon } from '@admin/shared/components/Ui/Icon/AttentionIcon';
import { Colors } from '@admin/assets/styles/colors';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import styles from './ErrorMessage.module.css';

type Props = {
    message: string;
    level?: 'error' | 'warning';
    withIcon?: boolean;
};
export const ErrorMessage = ({ message, level = 'error', withIcon = false }: Props) => {
    return (
        <div className={styles.container}>
            {withIcon && (
                <AttentionIcon
                    color={level === 'error' ? Colors.red : Colors.yellow}
                    size={IconSize.xs}
                />
            )}
            <p className={`${styles.text} ${level === 'error' ? styles.error : styles.warning}`}>
                {message}
            </p>
        </div>
    );
};
