import { UserIcon } from '@admin/shared/components/Ui/Icon/UserIcon';
import { IconSize, IconSizeType } from '@admin/shared/components/Ui/Icon/constants';
import styles from './Avatar.module.css';

type Props = {
    imgPath?: string;
    size?: IconSizeType;
    extraClassName?: string;
};
export const Avatar = ({ imgPath, size = IconSize.lg, extraClassName }: Props) => {
    return (
        <div
            className={`${styles.container} ${extraClassName}`}
            style={{
                width: `${size}px`,
                minWidth: `${size}px`,
                height: `${size}px`,
                minHeight: `${size}px`,
            }}
        >
            {imgPath === undefined ? (
                <UserIcon size={(size / 1.6) as IconSizeType} color="#0A6D8E" />
            ) : (
                <img src={imgPath} alt="avator" />
            )}
        </div>
    );
};
