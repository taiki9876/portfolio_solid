export const ADMIN_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT_ADMIN ?? '';

export const FIREBASE_CREDENTIALS = {
    apiKey: import.meta.env.VITE_FB_API_KEY ?? '',
    authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN ?? '',
    projectId: import.meta.env.VITE_FB_PROJECT_ID ?? '',
    storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET ?? '',
    messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID ?? '',
    appId: import.meta.env.VITE_FB_APP_ID ?? '',
};
