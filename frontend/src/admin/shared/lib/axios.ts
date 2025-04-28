import axios, { AxiosError } from 'axios';
import { ADMIN_API_ENDPOINT } from '@admin/env.ts';

const apiClient = axios.create({
    baseURL: ADMIN_API_ENDPOINT,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config) => {
        console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const errorMessage = `ERROR: ${error.message}`;
        console.log(`エラーが発生しました。\n${errorMessage}`);

        //TODO: Sentry通知
        return Promise.reject(error);
    }
);

export { apiClient };
