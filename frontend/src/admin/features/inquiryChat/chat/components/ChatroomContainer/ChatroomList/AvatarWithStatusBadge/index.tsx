import { Avatar } from '@admin/shared/components/Ui/Avatar';
import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import styles from './AvatarWithStatusBudge.module.css';
import { StatusBudge } from './StatusBadge';

type Props = {
    isProcessed: boolean;
    isSpam: boolean;
    imgPath?: string;
    size?: IconSizeType;
};
export const AvatarWithStatusBudge = ({
    isProcessed,
    isSpam,
    imgPath,
    size = IconSize.md,
}: Props) => {
    return (
        <div className={styles.container} style={{ width: `${size}px`, height: `${size}px` }}>
            <Avatar imgPath={imgPath} size={size} />
            <StatusBudge isProcessed={isProcessed} isSpam={isSpam} />
        </div>
    );
};
