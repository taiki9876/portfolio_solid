import { ReactNode, useEffect, useState } from 'react';
import { useAuthStore, useLoadingStore } from '@admin/shared/state/globalState';

type Props = {
    children: ReactNode;
};
export const AppInitialContainer = ({ children }: Props) => {
    const { loadProfile } = useAuthStore();
    const { toggleLoading } = useLoadingStore();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const initializeApp = async () => {
            toggleLoading(true);
            try {
                await loadProfile();
            } catch (err) {
                console.log(err);
                setHasError(true);
            } finally {
                toggleLoading(false);
            }
        };

        void initializeApp();
    }, [loadProfile, toggleLoading]);

    if (hasError) {
        throw new Error('アプリケーションの初期化時にエラーが発生しました。');
    }

    return <div>{children}</div>;
};
