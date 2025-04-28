import { create } from 'zustand';
import { PaginationMeta } from '@admin/domain/pagination/model';

type CustomerState = {
    searchWord: string;
    setSearchWord: (word: string) => void;

    pageMeta: PaginationMeta;
    setPageMeta: (meta: Partial<PaginationMeta>) => void;
};

export const useManagementNoticeStore = create<CustomerState>()((set, get) => ({
    searchWord: '',
    setSearchWord: (word: string) => set(() => ({ searchWord: word })),

    pageMeta: {
        page: 1,
        perPage: 20,
        total: 20,
        lastPage: 1,
    },
    setPageMeta: (meta: Partial<PaginationMeta>) => {
        const m = get().pageMeta;
        set(() => ({ pageMeta: { ...m, ...meta } }));
    },
}));
