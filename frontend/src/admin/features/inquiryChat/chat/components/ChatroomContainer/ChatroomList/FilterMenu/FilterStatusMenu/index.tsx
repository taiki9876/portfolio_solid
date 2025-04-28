import { CompactModal } from '@admin/shared/components/Ui/Modal/CompactModalMenu';
import { MenuitemType } from '@admin/shared/components/Ui/Modal/CompactModalMenu/MenuItem';
import { HamburgerMenuIcon } from '@admin/shared/components/Ui/Icon/HamburgerMenuIcon';
import { ReceiveIcon } from '@admin/shared/components/Ui/Icon/ReceiveIcon';
import { MailIcon } from '@admin/shared/components/Ui/Icon/MailIcon';
import { CheckIcon } from '@admin/shared/components/Ui/Icon/CheckIcon';
import { InfoCircleIcon } from '@admin/shared/components/Ui/Icon/InfoCircleIcon';
import {
    SearchStatusType,
    useInquiryStore,
} from '@admin/features/inquiryChat/state/useInquiryStore';
import { Colors } from '@admin/assets/styles/colors';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import styles from './FilterStatusButton.module.css';

type Props = {
    onClick: () => void;
    isOpen: boolean;
    closeMenu: () => void;
};
export const FilterStatusMenu = ({ isOpen, closeMenu, onClick }: Props) => {
    return (
        <>
            <div className={styles.container} onClick={onClick}>
                <svg
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M2.49914 1H15.4991C15.791 1.10236 16.0191 1.33401 16.1169 1.62742C16.2147 1.92084 16.1712 2.243 15.9991 2.5L10.9991 8V15L6.99914 12V8L1.99914 2.5C1.82706 2.243 1.78359 1.92084 1.8814 1.62742C1.97921 1.33401 2.20728 1.10236 2.49914 1"
                        stroke="#0A6D8E"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
            <Menu isOpen={isOpen} closeMenu={closeMenu} />
        </>
    );
};

const Menu = ({ isOpen, closeMenu }: { isOpen: boolean; closeMenu: () => void }) => {
    const searchCondition = useInquiryStore((state) => state.searchCondition);
    const setCondition = useInquiryStore((state) => state.setSearchCondition);

    const iconColor = (target: SearchStatusType) => {
        if (searchCondition.status === target) {
            return { color: Colors.primary, size: IconSize.sm };
        }
        return { color: Colors.gray400, size: IconSize.sm };
    };
    const setConditionAndClose = (status: SearchStatusType) => {
        setCondition({ status });
        closeMenu();
    };

    const menuItems: MenuitemType[] = [
        {
            label: 'すべて',
            icon: <HamburgerMenuIcon {...iconColor('all')} />,
            onClick: () => setConditionAndClose('all'),
            hasBorderLine: true,
        },
        {
            label: '未読',
            icon: <ReceiveIcon {...iconColor('unread')} />,
            onClick: () => setConditionAndClose('unread'),
        },
        {
            label: '未対応',
            icon: <MailIcon {...iconColor('pending')} />,
            onClick: () => setConditionAndClose('pending'),
        },
        {
            label: '対応済み',
            icon: <CheckIcon {...iconColor('processed')} isOn={true} />,
            onClick: () => setConditionAndClose('processed'),
        },
        {
            label: 'スパム',
            icon: <InfoCircleIcon {...iconColor('spam')} />,
            onClick: () => setConditionAndClose('spam'),
        },
    ];

    return (
        <CompactModal
            className={styles.menu}
            menuItems={menuItems}
            isOpen={isOpen}
            closeModal={closeMenu}
        />
    );
};
