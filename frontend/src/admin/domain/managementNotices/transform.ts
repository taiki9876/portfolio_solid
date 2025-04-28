import { isValidDate } from '@admin/shared/util/dateUtil';
import { ContractAppType } from '@admin/domain/contract/model';
import { AdminManagementNotice, ManagementNotice } from './model.ts';

// API取得データの変換用メソッド 店舗管理者向けお知らせ;
export type ManagementNoticeApiResource = {
    id: number;
    title: string;
    publishedAt: string;
    content: string;
};
export const convertToManagementNotice = (
    resource: ManagementNoticeApiResource
): ManagementNotice => {
    if (resource.publishedAt !== null && !isValidDate(resource.publishedAt)) {
        throw new Error('掲載日が不正です。');
    }

    return {
        id: resource.id,
        title: resource.title,
        publishedAt: new Date(resource.publishedAt),
        content: resource.content,
    };
};

// API取得データの変換用メソッド システム管理者向け
export type AdminManagementNoticeApiResource = {
    id: number;
    title: string;
    content: string;
    publishedAt: string;
    unpublishedAt: string | null;
    isPublished: boolean;
    currentPublishState: string;
    contractAppType: ContractAppType | null;
    createdAt: string;
};
export const convertToAdminManagementNotice = (
    resource: AdminManagementNoticeApiResource
): AdminManagementNotice => {
    if (resource.publishedAt !== null && !isValidDate(resource.publishedAt)) {
        throw new Error('掲載日が不正です。');
    }
    if (resource.createdAt !== null && !isValidDate(resource.createdAt)) {
        throw new Error('登録日が不正です。');
    }

    return {
        id: resource.id,
        title: resource.title,
        content: resource.content,
        publishedAt: new Date(resource.publishedAt),
        unpublishedAt:
            resource.unpublishedAt === null ? undefined : new Date(resource.unpublishedAt),
        isPublished: resource.isPublished,
        currentPublishState: resource.currentPublishState,
        contractAppType: resource.contractAppType === null ? undefined : resource.contractAppType,
        createdAt: new Date(resource.createdAt),
    };
};
