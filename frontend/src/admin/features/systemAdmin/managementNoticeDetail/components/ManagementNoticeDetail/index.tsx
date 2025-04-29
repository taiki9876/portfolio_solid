import { SectionTitle } from '@admin/shared/components/Ui/DetailComponents/SectionTitle';
import {
    InfoItemRow,
    InfoItemType,
} from '@admin/shared/components/Ui/DetailComponents/InfoItemRow';
import { formatDate } from '@admin/shared/util/dateUtil';
import {
    AdminManagementNotice,
    isPublishedString,
    showPopupString,
} from '@admin/domain/managementNotices/model';
import { ContractAppType, toContractAppString } from '@admin/domain/contract/model';
import { TextButton } from '@admin/shared/components/Ui/Button/TextButton';
import { useOpenNotice } from '@admin/shared/components/Ui/Modal/NoticeModal/useOpenNotice';
import { useOpenManagementNoticeForm } from '../ManagementNoticeEditForm/hooks/useOpenManagementNoticeForm';

type Props = {
    notice: AdminManagementNotice;
};
export const ManagementNoticeDetail = ({ notice }: Props) => {
    const { handleOpenContractForm } = useOpenManagementNoticeForm(notice);
    const { handleOpenNotice } = useOpenNotice();

    return (
        <>
            <SectionTitle
                title={notice.title}
                onEdit={{ label: '編集', onClick: handleOpenContractForm }}
            />
            <div>
                {convertNoticeInfo(notice).map((info) => {
                    return <InfoItemRow key={info.key} columns={[info]} labelWidth={110} />;
                })}
            </div>
            <TextButton
                label="プレビュー"
                variant="outline"
                onClick={() =>
                    handleOpenNotice(
                        notice.title,
                        notice.content,
                        formatDate(notice.publishedAt, { withTime: true, withWeekday: true })
                    )
                }
            />
        </>
    );
};

// ラベルとキーの対応表
const noticeLabels: { [K in keyof AdminManagementNotice]?: string } = {
    id: 'ID',
    title: '件名',
    content: '本文',
    publishedAt: '掲載日',
    unpublishedAt: '掲載終了日',
    isPublished: '公開許可',
    showPopup: 'ポップアップ表示',
    currentPublishState: '現在の公開状態',
    contractAppType: 'アプリタイプ',
    createdAt: '登録日',
};
// 変換関数
const convertNoticeInfo = (notice: AdminManagementNotice): InfoItemType[] => {
    return Object.keys(noticeLabels)
        .filter((key) => key in notice)
        .map((key) => {
            let value = notice[key as keyof AdminManagementNotice] ?? '';
            if (key === 'createdAt' || key === 'publishedAt' || key === 'unpublishedAt') {
                value =
                    value === ''
                        ? '指定なし'
                        : formatDate(value as Date, { withTime: true, withWeekday: true });
            }
            if (key === 'isPublished') {
                value = isPublishedString(value as boolean);
            }
            if (key === 'showPopup') {
                value = showPopupString(value as boolean);
            }
            if (key === 'contractAppType') {
                value = value === '' ? '指定なし' : toContractAppString(value as ContractAppType);
            }

            return {
                key,
                label: noticeLabels[key as keyof AdminManagementNotice]!,
                value: value as string | number,
            };
        });
};
