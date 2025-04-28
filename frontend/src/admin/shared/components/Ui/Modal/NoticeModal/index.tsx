import { FlexEnd } from '@admin/shared/components/Layout/FlexBox/FlexEnd';
import { UrlMessage } from '@admin/shared/components/Ui/Typography/UrlMessage';
import styles from './NoticeModal.module.css';

//タイトルと文字列のみのモーダル
type Props = {
    content: string;
    date?: string;
};
export const NoticeModal = ({ content, date }: Props) => {
    return (
        <div>
            <div className={styles.body}>
                <UrlMessage contentKey="noticeModal" content={content} />
            </div>

            <FlexEnd>{date}</FlexEnd>
        </div>
    );
};
