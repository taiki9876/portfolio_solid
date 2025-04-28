import { useLoadingStore } from '@admin/shared/state/globalState';
import { LoadingOverlay } from './LoadingOverlay';

export const LoadingWithStore = () => {
    const { isLoading, loadingMessage } = useLoadingStore();

    if (!isLoading) {
        return null;
    }

    return <LoadingOverlay message={loadingMessage} />;
};
