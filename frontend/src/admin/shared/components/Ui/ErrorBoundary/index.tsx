import { ReactNode } from 'react';
import { ErrorBoundary as BaseErrorBoundary } from 'react-error-boundary';
import { RedirectPath, redirectTo } from '@admin/shared/util/networkUtil.ts';
import { FallbackComponent } from '@admin/shared/components/Ui/ErrorBoundary/FallbackComponent.tsx';

type Props = {
    children: ReactNode;
};
export const ErrorBoundary = ({ children }: Props) => {
    return (
        <BaseErrorBoundary
            FallbackComponent={FallbackComponent}
            onReset={handleReset}
            onError={handleError}
        >
            {children}
        </BaseErrorBoundary>
    );
};

const handleReset = () => redirectTo(RedirectPath.HomePage);

const handleError = (error: Error) => {
    console.log(error);
    //TODO sentry呼び出しなど
};
