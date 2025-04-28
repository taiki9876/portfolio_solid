import { signInWithCustomToken } from 'firebase/auth';
import { firebaseAuth } from '@src/shared/firebase/firebase';

export const loginFirebase = async (loginToken: string) => {
    try {
        await signInWithCustomToken(firebaseAuth, loginToken);
        console.log('Firebaseへのログインに成功しました。');
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
