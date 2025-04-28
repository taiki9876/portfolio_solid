import { PaginationMeta } from './model.ts';

// API取得データの変換用メソッド;
export type PageMetaApiResource = {
    total: number;
    perPage: number;
    page: number;
    lastPage: number;
};
export const convertToPageMeta = (resource: PageMetaApiResource): PaginationMeta => {
    return {
        total: resource.total,
        perPage: resource.perPage,
        page: resource.page,
        lastPage: resource.lastPage,
    };
};
