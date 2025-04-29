import { FlexEnd } from '@admin/shared/components/Layout/FlexBox/FlexEnd';
import { UrlMessage } from '@admin/shared/components/Ui/Typography/UrlMessage';
import { TextButton } from '@admin/shared/components/Ui/Button/TextButton';
import { Separator } from '@admin/shared/components/Ui/Separator';
import styles from './NoticeModal.module.css';

//タイトルと文字列のみのモーダル
type Props = {
    content: string;
    date?: string;
    action?: { label: string; onClick: () => void };
};
export const NoticeModal = ({ content, date, action }: Props) => {
    return (
        <div>
            <div className={styles.body}>
                <UrlMessage contentKey="noticeModal" content={content} />
            </div>

            <FlexEnd>{date}</FlexEnd>

            {action !== undefined && (
                <>
                    <Separator />
                    <FlexEnd>
                        <TextButton
                            variant="outline"
                            label={action.label}
                            onClick={action.onClick}
                        />
                    </FlexEnd>
                </>
            )}
        </div>
    );
};
