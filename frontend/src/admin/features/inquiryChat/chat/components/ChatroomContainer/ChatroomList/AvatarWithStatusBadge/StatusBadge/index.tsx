import { AttentionIcon } from '@admin/shared/components/Ui/Icon/AttentionIcon';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import styles from '../AvatarWithStatusBudge.module.css';

type Props = {
    isProcessed: boolean;
    isSpam: boolean;
};
export const StatusBudge = ({ isSpam, isProcessed }: Props) => {
    if (isSpam) {
        return (
            <div className={styles.badge}>
                <AttentionIcon size={IconSize.xs} />
            </div>
        );
    }

    if (isProcessed) {
        return (
            <div className={styles.badge}>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="16" height="16" rx="8" fill="#0A6D8E" />
                    <path
                        d="M3.33398 8.00002L6.66732 11.3334L13.334 4.66669"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        );
    }

    return null;
};
