import { useCallback, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { firebaseAuth } from '@src/shared/firebase/firebase';
import { useAuthStore, useToastNotificationStore } from '@admin/shared/state/globalState';
import { loginFirebase } from '../../../firebase/loginFirebase';

export const useFirebaseLogin = () => {
    const { admin } = useAuthStore();
    const { notify } = useToastNotificationStore();

    const _isContractKeyMismatched = useCallback(
        async (currentUser: User | null) => {
            if (currentUser === null) {
                return true;
            }
            const tokenResult = await currentUser.getIdTokenResult();
            const claims = tokenResult.claims;

            return claims.contractKey !== admin?.contractKey;
        },
        [admin?.contractKey]
    );

    useEffect(() => {
        if (admin === undefined) {
            return;
        }

        const unsubscribe = onAuthStateChanged(firebaseAuth, async (currentUser) => {
            const isMismatched = await _isContractKeyMismatched(currentUser);
            if (isMismatched) {
                const isSuccess = await loginFirebase(admin.firebaseLoginToken);
                if (!isSuccess) {
                    notify('お問い合わせ機能へのログインに失敗しました。', 'error');
                }
            }
        });

        return () => {
            unsubscribe();
        };
    }, [_isContractKeyMismatched, admin, notify]);
};
