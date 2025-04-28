import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import { ActionButton } from '@admin/shared/components/Ui/Button/ActionButton';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@admin/routes/routes';
import { route } from '@admin/routes/type';
import { Tab } from './Tab';
import styles from './InquiryHeader.module.css';

export const InquiryHeader = () => {
    const navigate = useNavigate();
    const currentTab = useInquiryStore((state) => state.currentTab);
    const changeTab = useInquiryStore((state) => state.changeTab);

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                <Tab
                    label="店舗チャット"
                    onClick={() => changeTab('store')}
                    isActive={currentTab === 'store'}
                />
                <Tab
                    label="個人チャット"
                    onClick={() => changeTab('staff')}
                    isActive={currentTab === 'staff'}
                />
            </div>
            <div className={styles.actionButtons}>
                <ActionButton
                    label="自動応答設定"
                    onClick={() => void navigate(route(RouteNames.inquiryAutoResponse).path)}
                />
                <ActionButton
                    label="リッチメニュー設定"
                    onClick={() => void navigate(route(RouteNames.inquiryRichMenu).path)}
                />
            </div>
        </div>
    );
};
