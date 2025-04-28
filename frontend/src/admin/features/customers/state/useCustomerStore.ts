import { create } from 'zustand';
import { DefaultPaginationMeta, PaginationMeta } from '@admin/domain/pagination/model';

type CustomerState = {
    searchWord: string;
    setSearchWord: (word: string) => void;

    pageMeta: PaginationMeta;
    setPageMeta: (meta: Partial<PaginationMeta>) => void;
};

export const useCustomerStore = create<CustomerState>()((set, get) => ({
    searchWord: '',
    setSearchWord: (word: string) => set(() => ({ searchWord: word })),

    pageMeta: DefaultPaginationMeta,
    setPageMeta: (meta: Partial<PaginationMeta>) => {
        const m = get().pageMeta;
        set(() => ({ pageMeta: { ...m, ...meta } }));
    },
}));
