import { ContractAppType } from '@admin/domain/contract/model';

export type ManagementNotice = {
    id: number;
    title: string;
    publishedAt: Date;
    content: string;
};

export type AdminManagementNotice = {
    id: number;
    title: string;
    content: string;
    publishedAt: Date;
    unpublishedAt: Date | undefined;
    isPublished: boolean;
    showPopup: boolean;
    currentPublishState: string;
    contractAppType: ContractAppType | undefined;
    createdAt: Date;
};

export const isPublishedString = (isPublished: boolean): string => {
    return isPublished ? '許可' : '非公開';
};
export const showPopupString = (showPopup: boolean): string => {
    return showPopup ? 'ポップアップする' : 'ポップアップしない';
};
