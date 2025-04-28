import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FIREBASE_CREDENTIALS } from '@admin/env';

const config = FIREBASE_CREDENTIALS;

// Initialize Firebase
export const app = initializeApp(config);
export const firestore = getFirestore(app);
export const firebaseAuth = getAuth(app);
