export type PaginationMeta = {
    total: number;
    perPage: number;
    page: number;
    lastPage: number;
};

export const DefaultPaginationMeta: PaginationMeta = {
    page: 1,
    perPage: 20,
    total: 20,
    lastPage: 1,
};
