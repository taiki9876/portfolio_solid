import { ReactNode } from 'react';
import { QueryClientProvider as Provider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@admin/shared/lib/tanstackQuery';

/**
 * NOTE: ReactQueryDevtoolsは、"development"モードの時にのみ描画されます。
 */
type Props = {
    children: ReactNode;
};
export const QueryClientProvider = ({ children }: Props) => {
    return (
        <Provider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </Provider>
    );
};
