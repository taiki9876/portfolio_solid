import { SectionCardBox } from '@admin/features/home/components/SectionCardBox';
import ChatSummaryImage from '@admin/assets/images/chat_summary.svg';
import { SpaceBetween } from '@admin/shared/components/Layout/FlexBox/SpaceBetween';
import { Item } from '@admin/features/home/components/SectionCardBox/Item';
import { Colors } from '@admin/assets/styles/colors';
import styles from './ChatSummary.module.css';

export const ChatSummary = () => {
    return (
        <SectionCardBox shouldPadding={false}>
            <img src={ChatSummaryImage} alt="問い合わせ" className={styles.image} />
            <SpaceBetween className={styles.resultBox}>
                <Item label="未読" value="5" color={Colors.primary} />
                <Item label="未対応" value="5" color={Colors.primary} />
            </SpaceBetween>
        </SectionCardBox>
    );
};
