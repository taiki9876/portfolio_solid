import { SectionCardBox } from '@admin/features/home/components/SectionCardBox';
import { TextButton } from '@admin/shared/components/Ui/Button/TextButton';
import { truncateString } from '@admin/shared/util/stringUtil';
import { useOpenNotice } from '@admin/shared/components/Ui/Modal/NoticeModal/useOpenNotice';
import { formatDate } from '@admin/shared/util/dateUtil';
import { useNavigate } from 'react-router-dom';
import { route } from '@admin/routes/type';
import { RouteNames } from '@admin/routes/routes';
import { FulfilledPlaceholder } from '@admin/shared/components/Ui/Placeholder/FulfilledPlaceholder';
import { FlexStart } from '@admin/shared/components/Layout/FlexBox/FlexStart';
import { Separator } from '@admin/shared/components/Ui/Separator';
import styles from './ManagementNoticeList.module.css';
import { useFetchLatestManagementNotice } from './hooks/useFetchLatestManagementNotice';

export const ManagementNoticeList = () => {
    const { notices, isLoading } = useFetchLatestManagementNotice();
    const navigate = useNavigate();
    const { handleOpenNotice } = useOpenNotice();

    return (
        <SectionCardBox>
            <div className={styles.container}>
                <div className={styles.title}>運営からのお知らせ</div>

                <div className={styles.listContainer}>
                    {isLoading ? (
                        <NoticePlaceholder />
                    ) : (
                        <>
                            {notices.map((notice, index: number) => (
                                <div
                                    className={styles.item}
                                    key={`notice-${index}`}
                                    onClick={() => {
                                        handleOpenNotice(
                                            notice.title,
                                            notice.content,
                                            formatDate(notice.publishedAt, { withTime: true })
                                        );
                                    }}
                                >
                                    <div>{truncateString(notice.title, 14, true)}</div>
                                    <div>{formatDate(notice.publishedAt, { withTime: true })}</div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <div className={styles.buttonContainer}>
                    <TextButton
                        label="もっと見る"
                        variant="outline"
                        roundType="rounded"
                        onClick={() => navigate(route(RouteNames.managementNotices).path)}
                    />
                </div>
            </div>
        </SectionCardBox>
    );
};

const NoticePlaceholder = () => {
    return (
        <>
            <Separator isBorder={false} />
            <FlexStart direction="column" gap="medium">
                {['', '', '', ''].map((_, index) => (
                    <FlexStart key={`n-p-${index}`} direction="column" gap="small">
                        <div style={{ height: '24px', width: '100%' }}>
                            <FulfilledPlaceholder />
                        </div>
                        <div style={{ height: '16px', width: '70%' }}>
                            <FulfilledPlaceholder />
                        </div>
                    </FlexStart>
                ))}
            </FlexStart>
        </>
    );
};
