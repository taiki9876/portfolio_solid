import { HeaderType } from '@admin/shared/components/Ui/Table/TableHeader';
import { RowType } from '@admin/shared/components/Ui/Table/TableRow';
import { formatDate } from '@admin/shared/util/dateUtil';
import { AdminManagementNotice } from '@admin/domain/managementNotices/model';
import { truncateString } from '@admin/shared/util/stringUtil';
import { toContractAppString } from '@admin/domain/contract/model';

export const headers: HeaderType[] = [
    { label: 'ID', key: 'id' },
    { label: 'タイトル', key: 'title' },
    { label: '本文', key: 'content' },
    { label: '掲載日時', key: 'publishedAt' },
    { label: '掲載終了日時', key: 'unpublishedAt' },
    { label: '公開許可', key: 'isPublished' },
    { label: '公開状態', key: 'publishState' },
    { label: 'アプリタイプ', key: 'appType' },
    { label: '作成日', key: 'createdAt' },
];

export const createRows = (notices: AdminManagementNotice[]): RowType[] => {
    return notices.map((notice) => ({
        id: notice.id,
        values: [
            notice.id,
            truncateString(notice.title, 10, true),
            truncateString(notice.content, 10, true),
            formatDate(notice.publishedAt, { withTime: true, withWeekday: true }),
            notice.unpublishedAt === undefined
                ? ''
                : formatDate(notice.unpublishedAt, { withTime: true, withWeekday: true }),
            notice.isPublished,
            notice.currentPublishState,
            notice.contractAppType === undefined ? '' : toContractAppString(notice.contractAppType),
            formatDate(notice.createdAt, { withTime: true, withWeekday: true }),
        ],
    }));
};
