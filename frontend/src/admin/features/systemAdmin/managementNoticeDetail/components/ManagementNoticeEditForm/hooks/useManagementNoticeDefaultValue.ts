import { useEffect, useState } from 'react';
import { ManagementNoticeFormValues } from '@admin/domain/managementNotices/form/formValue';
import { AdminManagementNotice } from '@admin/domain/managementNotices/model';
import { formatDate } from '@admin/shared/util/dateUtil';

export const useManagementNoticeDefaultValue = (notice: AdminManagementNotice) => {
    const [defaultValues, setDefaultValues] = useState<ManagementNoticeFormValues>({
        title: notice.title,
        content: notice.content,
        publishedAt: formatDate(notice.publishedAt, { withTime: true }),
        unpublishedAt:
            notice.unpublishedAt === undefined
                ? undefined
                : formatDate(notice.unpublishedAt, { withTime: true }),
        isPublished: notice.isPublished,
        showPopup: notice.showPopup,
        contractAppType: notice.contractAppType === undefined ? '' : String(notice.contractAppType),
    });

    useEffect(() => {
        setDefaultValues({
            title: notice.title,
            content: notice.content,
            publishedAt: formatDate(notice.publishedAt, { withTime: true }),
            unpublishedAt:
                notice.unpublishedAt === undefined
                    ? undefined
                    : formatDate(notice.unpublishedAt, { withTime: true }),
            isPublished: notice.isPublished,
            showPopup: notice.showPopup,
            contractAppType:
                notice.contractAppType === undefined ? '' : String(notice.contractAppType),
        });
    }, [notice]);

    return { defaultValues };
};
