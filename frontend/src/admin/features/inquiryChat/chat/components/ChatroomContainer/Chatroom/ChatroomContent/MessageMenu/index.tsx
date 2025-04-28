import { Z_INDEX_MODAL } from '@admin/constants';
import { PressableBackground } from '@admin/shared/components/Ui/Modal/BaseModal';
import styles from './MessageMenu.module.css';

type Props = {
    close: () => void;
    isOpen: boolean;
};
export const MessageMenu = ({ close, isOpen }: Props) => {
    if (!isOpen) {
        return null;
    }

    return (
        <>
            <PressableBackground onClose={close} opacity={0} />
            <div className={styles.menuContainer} style={{ zIndex: Z_INDEX_MODAL }}>
                <ul className={styles.listContainer}>
                    <li>あああ</li>
                    <li>あああ</li>
                    <li>あああ</li>
                    <li>あああ</li>
                </ul>
            </div>
        </>
    );
};
