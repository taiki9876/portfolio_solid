import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import { Pagination } from './index';

/**
 * * ページネーションコンテナ
 * * 基本的にテーブルで利用
 */
const meta: Meta<typeof Pagination> = {
    title: 'UI/Pagination',
    component: Pagination,
    tags: ['autodocs'],
};

export default meta;

//-- Stories --
type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        totalItemCount: 80,
        perPage: {
            value: 10,
            onPerPageChange: (_: number) => {},
        },
        paging: {
            currentPage: 2,
            onPageChange: (_: number) => {},
        },
        separator: false,
    },
    render: ({ totalItemCount, perPage, paging, separator }) => {
        const [_, updateArgs] = useArgs();

        const handlePerPageChange = (newPerPage: number) => {
            updateArgs({
                perPage: {
                    ...perPage,
                    value: newPerPage,
                },
            });
        };
        const handlePageClick = (pageNum: number) => {
            updateArgs({
                paging: {
                    ...paging,
                    currentPage: pageNum,
                },
            });
        };
        return (
            <Pagination
                totalItemCount={totalItemCount}
                perPage={{ ...perPage, onPerPageChange: handlePerPageChange }}
                paging={{ ...paging, onPageChange: handlePageClick }}
                separator={separator}
            />
        );
    },
};
