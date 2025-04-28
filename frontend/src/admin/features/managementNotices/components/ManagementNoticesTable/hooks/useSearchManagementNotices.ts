import { useEffect } from 'react';
import { ApiEndpoint } from '@admin/shared/api/apiEndpoint';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { queryKeys } from '@admin/shared/lib/tanstackQuery';
import { PaginationMeta } from '@admin/domain/pagination/model';
import { useManagementNoticeStore } from '@admin/features/managementNotices/state/useManagementNoticeStore';
import { ManagementNotice } from '@admin/domain/managementNotices/model';

type SearchManagementNoticesCash = {
    notices: ManagementNotice[];
    pageMeta: PaginationMeta;
};
export const useSearchManagementNotices = () => {
    const searchWord = useManagementNoticeStore((state) => state.searchWord);
    const paginationMeta = useManagementNoticeStore((state) => state.pageMeta);
    const setPageMeta = useManagementNoticeStore((state) => state.setPageMeta);

    const { data, isPending } = useQuery<SearchManagementNoticesCash, AxiosError>({
        queryKey: queryKeys.searchManagementNotices(
            paginationMeta.perPage,
            paginationMeta.page,
            searchWord
        ),
        queryFn: async () => {
            const { notices, pageMeta } =
                await ApiEndpoint.managementNotices.fetchManagementNotices(
                    paginationMeta.perPage,
                    paginationMeta.page
                );
            return {
                notices: notices,
                pageMeta: pageMeta,
            };
        },
        enabled: true,
        placeholderData: keepPreviousData,
    });

    useEffect(() => {
        if (data?.pageMeta === undefined) {
            return;
        }
        setPageMeta(data.pageMeta);
    }, [data?.pageMeta, setPageMeta]);

    return {
        managementNotices: data?.notices ?? [],
        isLoading: isPending,
        paginationMeta,
        setPageMeta,
    };
};
