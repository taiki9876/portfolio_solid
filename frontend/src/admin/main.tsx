import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AdminApp } from './AdminApp.tsx';

// 管理画面用のエントリーポイント
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AdminApp />
    </StrictMode>
);
